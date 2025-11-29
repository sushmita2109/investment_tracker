import express from "express";
import { getDashboardStats } from "../controller/dashboardController.js";

const router = express.Router();

// GET Dashboard Stats
router.get("/stats", getDashboardStats);

export default router;
