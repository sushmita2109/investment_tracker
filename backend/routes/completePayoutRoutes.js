import express from "express";
import { addCompletePayout,getCompletePayoutByMonth } from "../controller/completePayoutController.js";

const router = express.Router();

router.post("/add", addCompletePayout);
router.get("/by-month", getCompletePayoutByMonth);

export default router;
