import Payout from "../models/Payout.js";
import Invesment from "../models/Invesment.js";

export const addPayout = async (req, res) => {
  try {
    const payout = await Payout.create(req.body);

    res.json({
      success: true,
      message: "Payout added successfully",
      data: payout,
    });
  } catch (error) {
    console.error("Error adding payout:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getPayoutsByInvestor = async (req, res) => {
  try {
    const payouts = await Payout.findAll({
      include: [
        {
          model: Invesment,
          as: "investment",
          attributes: [
            "id",
            "invesmentType",
            "targetAccountDetails",
            "amount",
            "expectedReturnRate",
            "invesmentDate",
          ],
        },
      ],
    });

    res.json({
      success: true,
      count: payouts.length,
      data: payouts,
    });
  } catch (error) {
    console.error("Error fetching payouts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updatePayout = async (req, res) => {
  try {
    const { id } = req.params;

    // Destructure all updatable fields from request body
    const {
      investorid,
      holderName,
      bankName,
      accountNumber,
      ifscCode,
      accountType,
      amount,
    } = req.body;

    // Find payout by primary key
    const payout = await Payout.findByPk(id);

    if (!payout) {
      return res.status(404).json({ message: "Payout entry not found" });
    }

    // Update only provided fields (ES6 nullish coalescing)
    payout.investorid = investorid ?? payout.investorid;
    payout.holderName = holderName ?? payout.holderName;
    payout.bankName = bankName ?? payout.bankName;
    payout.accountNumber = accountNumber ?? payout.accountNumber;
    payout.ifscCode = ifscCode ?? payout.ifscCode;
    payout.accountType = accountType ?? payout.accountType;
    payout.amount = amount ?? payout.amount;

    // Save changes
    await payout.save();

    return res.status(200).json({
      message: "Payout updated successfully",
      success: true,
      payout,
    });
  } catch (error) {
    console.error("Error updating payout:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
