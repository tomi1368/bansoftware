import { BaseRouter } from "./base.router.js";
import { VehicleController } from "../controllers/vehicle.controller.js";

export class VehicleRouter extends BaseRouter {
  constructor() {
    super(VehicleController);
  }

  routes() {
    this.router.get("/vehicles", (req, res) =>
      this.controller.getVehicles(req, res)
    );
  }
}
