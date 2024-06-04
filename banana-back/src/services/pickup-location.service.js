import PickupLocation from "../models/pickup-location.model.js";

class PickupLocationService {
  async getAll() {
    const pickupLocations = await PickupLocation.findAll({ raw: true });
    console.log(pickupLocations, "adsasdasdawasdsas");
    return pickupLocations;
  }
}

export default new PickupLocationService();
