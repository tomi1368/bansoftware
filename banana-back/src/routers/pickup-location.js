import { BaseRouter } from "./base.router.js";
import { PickupLocationController } from "../controllers/pickup-location.controller.js";

export class PickupLocationRouter extends BaseRouter {
  constructor() {
    super(PickupLocationController);
  }

  routes() {
    this.router.get("/pickup-location", (req, res) =>
      this.controller.getAllPickupsLocation(req, res)
    );
  }
}
