import { Sequelize } from "sequelize";
import config from "../helpers/enviroment.js";

class Database {
  constructor() {
    this.db = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      port: config.port,
    });
  }
}

export default new Database();
