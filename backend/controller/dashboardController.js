import Investors from "../models/Investors.js";
import Invesment from "../models/Invesment.js";

export const getDashboardStats = async (req, res) => {
  try {
    // 1. Total number of investors
    const totalInvestors = await Investors.count();

    // 2. Total investments records
    const totalInvestments = await Invesment.count();

    // 3. Active investors
    const activeInvestments = await Invesment.count({
      where: { maturityDate: "" },
    });

    return res.status(200).json({
      totalInvestors,
      totalInvestments,
      activeInvestments,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
};
