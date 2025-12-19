import Payout from "../models/Payout.js";
import Investors from "../models/Investors.js";

export default function registerInvestmentHooks(Invesment) {
  Invesment.afterCreate(async (inv) => {
    try {
      // ✅ Only create payout for OWN account
      if (inv.targetAccountDetails !== "own") {
        return; // 🚫 STOP HERE
      }

      // Prevent duplicate payout
      const exists = await Payout.findOne({
        where: { investmentId: inv.id },
      });
      if (exists) return;

      const investor = await Investors.findOne({
        where: { userid: inv.investorid },
      });
      if (!investor) return;

      // Monthly interest
      const interestAmount =
        (Number(inv.amount) * Number(inv.expectedReturnRate)) / 100 / 12;

      await Payout.create({
        investorid: inv.investorid,
        investmentId: inv.id,
        holderName: `${investor.firstname} ${investor.lastname}`,
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountType: "savings",
        amount: interestAmount,
        tds: 0, // ✅ always 0 for own account
        status: "active",
      });
    } catch (err) {
      console.error("Investment afterCreate hook error:", err);
    }
  });
}
