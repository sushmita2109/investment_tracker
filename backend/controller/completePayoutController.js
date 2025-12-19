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

export const getCompletePayoutByMonthAll = async (req, res) => {
  try {
    const { paidmonth } = req.query;

    if (!paidmonth) {
      return res.status(400).json({
        success: false,
        message: "paidmonth is required",
      });
    }

    const records = await CompletePayout.findAll({
      where: { paidmonth },
      order: [["createdAt", "DESC"]],
    });

    if (!records.length) {
      return res.json({ success: false, message: "No records found" });
    }

    res.json({ success: true, records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const getAllCompletePayouts = async (req, res) => {
  try {
    const records = await CompletePayout.findAll();

    if (!records.length) {
      return res.json({
        success: false,
        message: "No complete payout records found",
      });
    }

    // 🔹 Convert "MMM-YYYY" → Date for proper sorting
    const sortedRecords = records.sort((a, b) => {
      const dateA = new Date(`01-${a.paidmonth}`);
      const dateB = new Date(`01-${b.paidmonth}`);
      return dateA - dateB;
    });
return res.json({
      success: true,
      count: sortedRecords.length,
      records: sortedRecords,
    });
  } catch (error) {
    console.error("Get Complete Payout Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching complete payouts",
    });
  }
};
