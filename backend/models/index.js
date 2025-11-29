import sequelize from "../config/db.js";
import Admins from "./Admins.js";
import Investors from "./Investors.js";
import Invesment from "./Invesment.js";
// import Payout from "./Payout.js"; // <-- ADD THIS
import Payout from "./Payout.js";
// Make sure associations are defined
import "../models/associations.js"; // <-- OPTIONAL (if you put associations in a separate file)

const syncDB = async () => {
  try {
    await sequelize.sync();
    console.log(
      "Admins, Investors, Invesment & Payout tables synced successfully!"
    );
    // process.exit();
  } catch (err) {
    console.error("DB sync error:", err);
  }
};

syncDB();

export { Admins, Investors, Invesment, Payout }; // <-- EXPORT IT
