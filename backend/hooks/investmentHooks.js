import Payout from "../models/Payout.js";
import Investors from "../models/Investors.js";

export default function registerInvestmentHooks(Invesment) {
  Invesment.afterCreate(async (inv) => {
    const exists = await Payout.findOne({
      where: { investmentId: inv.id },
    });

    if (exists) return;
    if (inv.targetAccountDetails === "own") {
      const investor = await Investors.findOne({
        where: { userid: inv.investorid },
      });

      const interestAmount =
        Number(inv.amount) * (Number(inv.expectedReturnRate) / 100);

      await Payout.create({
        investorid: inv.investorid,
        investmentId: inv.id,
        holderName: investor.firstname + " " + investor.lastname,
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountType: "savings",
        amount: interestAmount,
      });
    }
  });
}
