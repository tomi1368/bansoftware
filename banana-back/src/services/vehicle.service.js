import Vehicle from "../models/vehicle.model.js";

class VehicleService {
  async getAll(filters = {}) {
    const vehicles = await Vehicle.findAll({
      where: filters,
      raw: true,
    });
    return vehicles;
  }
}

export default new VehicleService();
