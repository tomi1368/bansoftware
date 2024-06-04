import { Router } from "express";

export class BaseRouter {
  constructor(Controller) {
    this.controller = new Controller();
    this.router = Router();
    this.routes();
  }

  routes() {}
}
