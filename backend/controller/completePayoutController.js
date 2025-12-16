import CompletePayout from "../models/CompletePayout.js";

export const addCompletePayout = async (req, res) => {
  try {
    const { payouts } = req.body;
    // console.log("payouts",payouts)

    if (!Array.isArray(payouts) || payouts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No payouts provided",
      });
    }

    await CompletePayout.bulkCreate(payouts);

    res.json({
      success: true,
      message: "Payments marked successfully",
    });
  } catch (err) {
    console.error("Complete Payout Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET /api/complete-payout/by-month
export const getCompletePayoutByMonth = async (req, res) => {
  try {
    const { investorid, paidmonth } = req.query;

    if (!investorid || !paidmonth) {
      return res.status(400).json({
        success: false,
        message: "investorid and paidmonth are required",
      });
    }

    const records = await CompletePayout.findAll({
      where: {
        investorid,
        paidmonth,
      },
      order: [["createdAt", "ASC"]],
    });
    console.log("Records",records)
    return res.json({
      success: true,
      count: records.length,
      records,
    });
  } catch (error) {
    console.error("Get Complete Payout Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

