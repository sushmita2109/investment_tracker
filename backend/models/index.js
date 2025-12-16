import sequelize from "../config/db.js";
import Admins from "./Admins.js";
import Investors from "./Investors.js";
import Invesment from "./Invesment.js";
// import Payout from "./Payout.js"; // <-- ADD THIS
import Payout from "./Payout.js";
import CompletePayout from "./CompletePayout.js";
// Make sure associations are defined
import "../models/associations.js"; // <-- OPTIONAL (if you put associations in a separate file)
import registerInvestmentHooks from "../hooks/investmentHooks.js";

const syncDB = async () => {
  try {
    await sequelize.sync();
    console.log(
      "Admins, Investors, Invesment, Payout & CompletePayout tables synced successfully!"
    );
  } catch (err) {
    console.error("DB sync error:", err);
  }
};


registerInvestmentHooks(Invesment);
export { Admins, Investors, Invesment, Payout, CompletePayout, syncDB }; // <-- EXPORT IT
