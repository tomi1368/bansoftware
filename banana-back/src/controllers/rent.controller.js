import RentService from "../services/rent.service.js";

export class RentController {
  async createRent(req, res) {
    try {
      const rent = await RentService.create(req.body);
      res.status(200).json(rent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async finishRent(req, res) {
    try {
      const rent = await RentService.finishRent(req.body);
      res.status(200).json(rent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getReport(req, res) {
    try {
      const report = await RentService.getReport(req.body);
      res.status(200).json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
