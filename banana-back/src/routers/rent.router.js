import { RentController } from "../controllers/rent.controller.js";
import { BaseRouter } from "./base.router.js";

export class RentRouter extends BaseRouter {
  constructor() {
    super(RentController);
  }

  routes() {
    this.router.post("/rent", (req, res) =>
      this.controller.createRent(req, res)
    );
    this.router.post("/rent/return", (req, res) =>
      this.controller.finishRent(req, res)
    );
    this.router.post("/rent/report", (req, res) => {
      this.controller.getReport(req, res);
    });
  }
}
