import { BaseRouter } from "./base.router.js";
import { UserController } from "../controllers/user.controller.js";

export class UserRouter extends BaseRouter {
  constructor() {
    super(UserController);
  }

  routes() {
    this.router.get("/user", (req, res) => this.controller.getOne(req, res));
  }
}
