import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
} from "../controller/authController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// register admin
router.post("/register", registerAdmin);

// login admin
router.post("/login", loginAdmin);

// get all admins (protected)
router.get("/", verifyToken, getAllAdmins);

export default router;
