import Payout from "../models/Payout.js";
import Invesment from "../models/Invesment.js";
import CompletePayout from "../models/CompletePayout.js";

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
      tds
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
    payout.tds = tds ?? payout.tds;

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

export const deletePayout = async (req, res) => {
  try {
    const { id } = req.params;

    const payout = await Payout.findByPk(id);

    if (!payout) {
      return res.status(404).json({
        success: false,
        message: "Payout record not found",
      });
    }

    // 👇 SOFT DELETE
    payout.status = "inactive";
    await payout.save();

    return res.json({
      success: true,
      message: "Payout marked as inactive successfully",
    });
  } catch (error) {
    console.error("Delete Payout Error:", error);
    res.status(500).json({
    success: false,
      message: "Server error while deleting payout",
    });
  }
};

export const getUnpaidPayouts = async (req, res) => {
  try {
    const { investorid, month, year } = req.query;

    if (!investorid || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "investorid, month and year are required",
      });
    }

    const paidMonth = `${month}-${year}`; // e.g. Dec-2025

    // 1️⃣ CHECK IF INVESTOR ALREADY PAID
    const alreadyPaid = await CompletePayout.findOne({
      where: {
        investorid,
        paidmonth: paidMonth,
      },
    });

    if (alreadyPaid) {
      return res.json({
        success: true,
        alreadyPaid: true,
        message: `Investor already paid for ${paidMonth}`,
        report: [],
      });
    }
   

    // 2️⃣ FETCH ONLY PAYOUT TABLE DATA
    const payouts = await Payout.findAll({
      where: {
        investorid,
      },
      order: [["createdAt", "ASC"]],
    });

    return res.json({
      success: true,
      alreadyPaid: false,
      report: payouts,
    });


  } catch (err) {
    console.error("getUnpaidPayouts error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

