import Invesment from "../models/Invesment.js";

export const addInvesment = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    const invesment = await Invesment.create(req.body);
    res.json({ message: "Invesment added", invesment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const listInvesments = async (req, res) => {
  try {
    const invesments = await Invesment.findAll({
      attributes: ["investorid", "invesmentType", "amount", "invementDate"],
    });
    return res.status(200).json({
      success: true,
      data: invesments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    return res.status(500).json({
      success: false,
      message: "Failed to fetch invesments",
    });
  }
};

export const getAllInvestments = async (req, res) => {
  try {
    const investments = await Invesment.findAll(); // fetch all rows

    return res.json({
      success: true,
      count: investments.length,
      data: investments,
    });
  } catch (error) {
    console.error("Error fetching investments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateInvestment = async (req, res) => {
  try {
    const { id } = req.params; // investment id
    const updateData = req.body;

    const inv = await Invesment.findByPk(id);

    if (!inv) {
      return res.status(404).json({ error: "Investment not found" });
    }

    await inv.update(updateData);

    res.json({ message: "Investment updated successfully", investment: inv });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params;

    // find investment
    const investment = await Invesment.findByPk(id);

    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    // instead of deleting - update maturityDate
    investment.maturityDate = new Date();
    await investment.save();

    return res.json({
      message: "Investment closed successfully (maturity date updated)",
      investment,
    });
  } catch (error) {
    console.error("Error closing investment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
