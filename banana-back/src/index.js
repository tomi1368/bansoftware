import app from "./app/app.js";
import database from "./config/database.js";

class Boostrap {
  constructor() {
    this.run();
  }

  async run() {
    try {
      await database.db.sync({ force: true });
      app.listen(process.env.PORT, () => {
        console.log("Running", process.env.PORT);
      });
    } catch (err) {
      console.log("Error", err);
    }
  }
}

new Boostrap();
