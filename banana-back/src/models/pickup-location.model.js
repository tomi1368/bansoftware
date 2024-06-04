import { DataTypes, Model } from "sequelize";
import db from "../config/database.js";

class PickupLocation extends Model {}

PickupLocation.init(
  {
    pickup_location_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
  },
  {
    sequelize: db.db,
    modelName: "PickupLocation",
    tableName: "PickupLocations",
  }
);

export default PickupLocation;
