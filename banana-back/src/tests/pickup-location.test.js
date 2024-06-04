import database from "../config/database";
import request from "supertest";
import app from "../app/app.js";
import { v4 as uuidv4 } from "uuid";
import PickupLocation from "../models/pickup-location.model.js";

describe("Pick-up", () => {
  beforeAll(async () => {
    await database.db.sync({ force: true });
  });
  beforeEach(async () => {
    await PickupLocation.truncate({ force: true });
  });
  describe("GET /api/pickup-location", () => {
    it("Should get all pickup locations", async () => {
      await PickupLocation.create({ name: "Caballito", capacity: 10 });
      const res = await request(app).get("/api/pickup-location");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
  });
  afterAll(async () => {
    await database.db.close();
  });
});
