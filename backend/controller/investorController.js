import Investor from "../models/Investors.js";

export const addInvestor = async (req, res) => {
  try {
    const investor = await Investor.create(req.body);
    res.json({ message: "Investor added", investor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getInvestors = async (req, res) => {
  try {
    const data = await Investor.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateInvestor = async (req, res) => {
  try {
    const { userid } = req.params;

    const investor = await Investor.findByPk(userid);

    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    Object.keys(req.body).forEach((key) => {
      investor[key] = req.body[key];
    });

    await investor.save();

    res.json({ message: "Investor updated successfully", investor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listInvestors = async (req, res) => {
  try {
    const investors = await Investor.findAll({
      attributes: ["firstname", "lastname", "phone", "status"], // only these fields
    });

    return res.status(200).json({
      success: true,
      data: investors,
    });
  } catch (error) {
    console.error("Error fetching investors:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch investors",
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Find investor by ID
    const investors = await Investor.findByPk(id);

    if (!investors) {
      return res.status(404).json({ message: "Investor not found" });
    }

    // Update the status instead of deleting
    investors.status = "inactive";
    await investors.save();

    return res.json({ message: "Investor deactivated successfully" });
  } catch (error) {
    console.error("Delete Investor error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
