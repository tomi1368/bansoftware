import PickupLocation from "../models/pickup-location.model.js";
import Rent from "../models/rent.model.js";
import Vehicle from "../models/vehicle.model.js";
import { Op } from "sequelize";
import UserService from "./user.service.js";
class RentService {
  async getReport(payload) {
    const { user_dni, createdAt, endDate } = payload;
    const rents = await Rent.findAll({
      where: {
        user_dni,
        createdAt: {
          [Op.between]: [new Date(createdAt), new Date(endDate)],
        },
      },
    });

    const totalMinutes = rents.reduce((sum, rent) => sum + rent.totalTime, 0);
    const totalBonus = rents.reduce((sum, rent) => sum + rent.bonusTime, 0);
    const totalPenalties = rents.reduce(
      (sum, rent) => sum + rent.penaltyTime,
      0
    );

    return {
      rents,
      totalMinutes,
      totalBonus,
      totalPenalties,
    };
  }
  async create(payload) {
    const { vehicle_id, user_dni, pickup_location_id } = payload;
    const vehicle = await Vehicle.findByPk(vehicle_id);
    if (!vehicle.available) {
      throw new Error("Rent not available");
    }
    const user = await UserService.getUser(user_dni);

    if (user.availableTime <= 0) {
      throw new Error("no available time for rent");
    }
    const existRent = await Rent.findOne({
      where: { endDate: null, user_dni: user.user_dni },
    });

    if (!!existRent) {
      throw new Error("You´re renting a vehicle");
    }

    const pickupLocation = await PickupLocation.findByPk(pickup_location_id);
    pickupLocation.capacity -= 1;
    vehicle.available = false;
    await vehicle.save();
    await pickupLocation.save();
    const newRent = await Rent.create({ vehicle_id, user_dni }, { raw: true });
    return { ...newRent, timeToRent: user.availableTime };
  }
  async finishRent(payload) {
    const { user_dni = undefined, vehicle_id, pickup_location_id } = payload;

    const rent = await Rent.findOne({
      where: { user_dni, vehicle_id, endDate: null },
    });
    if (!rent) {
      throw new Error("No active rent");
    }

    const pickupLocation = await PickupLocation.findByPk(pickup_location_id);
    if (pickupLocation.capacity + 1 > 10) {
      throw new Error("No capacity in pickup location");
    }

    const user = await UserService.getUser(user_dni);

    if (!user) {
      throw new Error("User doesnt exist");
    }

    pickupLocation.capacity += 1;
    await pickupLocation.save();

    const endDate = new Date();
    const duration = Math.floor((endDate - rent.createdAt) / 60000); // Duration in minutes

    console.log(endDate, duration, user.dataValues);

    rent.endDate = endDate;
    rent.totalTime = duration;

    if (duration > user.availableTime) {
      user.availableTime -= 30;
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentRentals = await Rent.count({
      where: {
        user_dni,
        createdAt: { [Op.gte]: oneWeekAgo },
      },
    });

    if (recentRentals % 2 === 0) {
      rent.bonusTime = 30;
      user.availableTime += 30;
    }

    await rent.save();
    await user.save();

    const vehicle = await Vehicle.findByPk(vehicle_id);
    vehicle.available = true;
    vehicle.pickup_location_id_fk = pickup_location_id;
    await vehicle.save();

    return rent;
  }
}

export default new RentService();
