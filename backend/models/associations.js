import Investors from "./Investors.js";
import Invesment from "./Invesment.js";
import Payout from "./Payout.js";

// Investor → Investment (1:N)
Investors.hasMany(Invesment, {
  foreignKey: "investorid",
  sourceKey: "userid",
});
Invesment.belongsTo(Investors, {
  foreignKey: "investorid",
  targetKey: "userid",
});

// Investor → Payout (1:N)
Investors.hasMany(Payout, {
  foreignKey: "investorid",
  sourceKey: "userid",
});
Payout.belongsTo(Investors, {
  foreignKey: "investorid",
  targetKey: "userid",
});

Payout.belongsTo(Invesment, {
  foreignKey: "investmentId",
  as: "investment",
});

Invesment.hasMany(Payout, {
  foreignKey: "investmentId",
  as: "payouts",
});
