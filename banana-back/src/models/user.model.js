import { DataTypes, Model } from "sequelize";
import database from "../config/database.js";

class User extends Model {}

User.init(
  {
    user_dni: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    availableTime: { type: DataTypes.INTEGER },
  },
  {
    sequelize: database.db,
    modelName: "User",
    tableName: "Users",
  }
);

export default User;
