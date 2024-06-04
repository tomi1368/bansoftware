import { DataTypes, Model } from "sequelize";
import database from "../config/database.js";

class Rent extends Model {}

Rent.init(
  {
    endDate: DataTypes.DATE,
    vehicle_id: DataTypes.UUID,
    user_dni: DataTypes.INTEGER,
    totalTime: DataTypes.INTEGER,
    bonusTime: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    penaltyTime: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: database.db,
    modelName: "Rent",
    tableName: "Rents",
  }
);

export default Rent;
