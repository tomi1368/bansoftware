import database from "../config/database";
import request from "supertest";
import app from "../app/app.js";
import { v4 as uuidv4 } from "uuid";
import Rent from "../models/rent.model.js";
import Vehicle from "../models/vehicle.model.js";
import PickupLocation from "../models/pickup-location.model.js";

describe("Rent", () => {
  beforeAll(async () => {
    await database.db.sync({ force: true });
  });
  beforeEach(async () => {
    await Rent.truncate({ force: true });
    await Vehicle.truncate({ force: true });
  });

  describe("POST /api/rent", () => {
    it("Should rent a available vehicle from one pickup location", async () => {
      const pickupLocationId = uuidv4();
      const vehicleId = uuidv4();
      const rentId = uuidv4();
      const userDNI = 12345678;
      await PickupLocation.create({
        capacity: 10,
        pickup_location_id: pickupLocationId,
        name: "Caballito",
      });
      await Vehicle.create({
        vehicle_id: vehicleId,
        available: true,
        pickup_location_id_fk: pickupLocationId,
      });
      const res = await request(app).post("/api/rent").send({
        rent_id: rentId,
        vehicle_id: vehicleId,
        user_dni: userDNI,
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("rent_id", rentId);
    });
    it("Shouldn´t rent a unavailable vehicle", async () => {
      const pickupLocationId = uuidv4();
      const vehicleId = uuidv4();
      const rentId = uuidv4();
      const userDNI = 12345678;
      await PickupLocation.create({
        capacity: 10,
        pickup_location_id: pickupLocationId,
        name: "Caballito",
      });
      await Vehicle.create({
        vehicle_id: vehicleId,
        available: false,
        pickup_location_id_fk: pickupLocationId,
      });
      const res = await request(app).post("/api/rent").send({
        rent_id: rentId,
        vehicle_id: vehicleId,
        user_dni: userDNI,
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Rent not available");
    });
  });
  afterAll(async () => {
    await database.db.close();
  });
});
