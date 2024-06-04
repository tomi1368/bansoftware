import { DataTypes, Model } from "sequelize";
import db from "../config/database.js";
import PickupLocation from "./pickup-location.model.js";

class Vehicle extends Model {}

Vehicle.init(
  {
    vehicle_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pickup_location_id_fk: {
      type: DataTypes.UUID,
    },
  },
  { sequelize: db.db, modelName: "Vehicle", tableName: "Vehicles" }
);

export default Vehicle;
