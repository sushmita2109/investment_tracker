import Investors from "./Investors.js";
import Invesment from "./Invesment.js";
import Payout from "./Payout.js";

// Investor → Investment (1:N)
Investors.hasMany(Invesment, {
  foreignKey: "investorid",
  sourceKey: "userid",
  as: "investments",
});

Invesment.belongsTo(Investors, {
  foreignKey: "investorid",
  targetKey: "userid",
  as: "investor",
});

// Investor → Payout (1:N)
Investors.hasMany(Payout, {
  foreignKey: "investorid",
  sourceKey: "userid",
  as: "payouts",
});

Payout.belongsTo(Investors, {
  foreignKey: "investorid",
  targetKey: "userid",
  as: "investor",
});

// Investment → Payout (1:N)
Invesment.hasMany(Payout, {
  foreignKey: "investmentId",
  as: "payouts",
});

Payout.belongsTo(Invesment, {
  foreignKey: "investmentId",
  as: "investment",
});
