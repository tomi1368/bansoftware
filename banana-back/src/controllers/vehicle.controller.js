import VehicleService from "../services/vehicle.service.js";

export class VehicleController {
  async getVehicles(req, res) {
    try {
      const vehicles = await VehicleService.getAll(req.query);
      res.status(200).json(vehicles);
    } catch (err) {
      res.status(400).json({ err });
    }
  }
}
