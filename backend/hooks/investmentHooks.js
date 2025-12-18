import Payout from "../models/Payout.js";
import Investors from "../models/Investors.js";

export default function registerInvestmentHooks(Invesment) {
  Invesment.afterCreate(async (inv) => {
    // Prevent duplicate payout
    const exists = await Payout.findOne({
      where: { investmentId: inv.id },
    });

    if (exists) return;

    const investor = await Investors.findOne({
      where: { userid: inv.investorid },
    });

    if (!investor) return;

    // Calculate interest amount
    const interestAmount =
      Number(inv.amount) * (Number(inv.expectedReturnRate) / 100);

    // ✅ TDS logic
    const isOwnAccount = inv.targetAccountDetails === "own";
    const tds = isOwnAccount ? 0 : interestAmount * 0.1;

    await Payout.create({
      investorid: inv.investorid,
      investmentId: inv.id,
      holderName: `${investor.firstname} ${investor.lastname}`,
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountType: "savings",
      amount: interestAmount,
      tds, // ✅ CONDITIONAL TDS
    });
  });
}
