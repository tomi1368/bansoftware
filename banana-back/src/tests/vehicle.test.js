import database from "../config/database";
import request from "supertest";
import app from "../app/app.js";
import { v4 as uuidv4 } from "uuid";
import Vehicle from "../models/vehicle.model.js";
import PickupLocation from "../models/pickup-location.model.js";

describe("Vehicle", () => {
  beforeAll(async () => {
    await database.db.sync({ force: true });
  });
  beforeEach(async () => {
    await PickupLocation.truncate({ force: true });
    await Vehicle.truncate({ force: true });
  });

  describe("GET /vehicles", () => {
    it("Should have all vehicles", async () => {
      const vehicleId = uuidv4();
      await Vehicle.create({
        vehicle_id: vehicleId,
        available: true,
        pickup_location_id_fk: uuidv4(),
      });
      const res = await request(app).get("/api/vehicles");

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
    it("Should get all available vehicles", async () => {
      const vehicleId = uuidv4();
      await Vehicle.create({
        vehicle_id: vehicleId,
        available: true,
        pickup_location_id_fk: uuidv4(),
      });
      const res = await request(app).get("/api/vehicles?available=true");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
    it("Get vehicle by pickup location id", async () => {
      const pickupLocationId = uuidv4();
      const vehicleId = uuidv4();
      await PickupLocation.create({
        name: "Caballito",
        pickup_location_id: pickupLocationId,
        capacity: 10,
      });
      await Vehicle.create({
        vehicle_id: vehicleId,
        available: true,
        pickup_location_id_fk: pickupLocationId,
      });
      const res = await request(app).get(
        `/api/vehicles?pickup_location_id_fk=${pickupLocationId}`
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty(
        "pickup_location_id_fk",
        pickupLocationId
      );
    });
  });
  afterAll(async () => {
    await database.db.close();
  });
});
