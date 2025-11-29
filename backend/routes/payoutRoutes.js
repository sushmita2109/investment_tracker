import express from "express";
import {
  addPayout,
  getPayoutsByInvestor,
  updatePayout,
} from "../controller/payoutController.js";

const router = express.Router();

router.post("/add", addPayout);
router.get("/all", getPayoutsByInvestor);
router.put("/update/:id", updatePayout);

export default router;
