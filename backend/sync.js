import sequelize from "./config/db.js";
import "./models/Investors.js";
import "./models/Invesment.js";
import "./models/Payout.js";

sequelize
  .sync({ alter: true }) // or use { force: true } to drop+recreate
  .then(() => {
    console.log("All tables created successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Sync failed:", err);
    process.exit(1);
  });
