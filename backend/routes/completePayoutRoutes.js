import express from "express";
import { addCompletePayout,getCompletePayoutByMonth,getCompletePayoutByMonthAll } from "../controller/completePayoutController.js";

const router = express.Router();

router.post("/add", addCompletePayout);
router.get("/by-month", getCompletePayoutByMonth);
router.get(
  "/complete-payout/by-month/all",
  getCompletePayoutByMonthAll
);


export default router;
