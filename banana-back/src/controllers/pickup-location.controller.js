import PickupLocationService from "../services/pickup-location.service.js";

export class PickupLocationController {
  async getAllPickupsLocation(req, res) {
    try {
      const pickupLocations = await PickupLocationService.getAll();
      console.log("asdasdasdasdsad", pickupLocations);
      res.status(200).json(pickupLocations);
    } catch (err) {
      console.log("errorcitoasdasdasdasd", err.message);
      res.status(400).json({ err });
    }
  }
}
