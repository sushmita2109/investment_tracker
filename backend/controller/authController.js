import Admins from "../models/Admins.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await Admins.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admins.create({
      username,
      email,
      password: hashed,
    });

    res.json({ message: "Admin registered", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admins.findOne({ where: { email } });

    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin.id, email: admin.email }, "secret123", {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
