import express from "express";
import {
  addPayout,
  getPayoutsByInvestor,
  updatePayout,
  deletePayout,
} from "../controller/payoutController.js";

const router = express.Router();

router.post("/add", addPayout);
router.get("/all", getPayoutsByInvestor);
router.put("/update/:id", updatePayout);
router.delete("/delete/:id", deletePayout);

export default router;
