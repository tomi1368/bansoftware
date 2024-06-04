import express from "express";
import cors from "cors";
import { VehicleRouter } from "../routers/vehicle.router.js";
import { PickupLocationRouter } from "../routers/pickup-location.js";
import { RentRouter } from "../routers/rent.router.js";
import cron from "node-cron";
import User from "../models/user.model.js";
import Rent from "../models/rent.model.js";
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routers();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  routers() {
    const routers = [
      new VehicleRouter(),
      new PickupLocationRouter(),
      new RentRouter(),
    ];
    routers.forEach((router) => {
      this.app.use("/api", router.router);
    });
  }
  async resetTimeCron() {
    cron.schedule("0 0 * * *", async () => {
      const users = await User.findAll();

      for (let user of users) {
        const rents = await Rent.findAll({
          where: {
            user_dni: user.user_dni,
            createdAt: {
              [Sequelize.Op.gt]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        });

        if (rents.length === 0) {
          user.availableTime = 120; // Restablecer a 2 horas
          await user.save();
        }
      }
    });
  }
}

export default new App().app;
