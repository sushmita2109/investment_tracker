import express from "express";
import {
  getOverallSummary,
  downloadOverallSummaryCSV,
  getInvestorReport,
  downloadInvestorReportExcel,
  getInterestReport,
  downloadInterestReportExcel,
  getPayoutReport,
  downloadPayoutReportCSV,
} from "../controller/reportController.js";

const router = express.Router();

// ---------------------- OVERALL SUMMARY ----------------------
router.get("/overall", getOverallSummary);
router.get("/overall/download", downloadOverallSummaryCSV);

// ---------------------- INVESTOR REPORT ---------------------
router.get("/investor/:investorid", getInvestorReport);
router.get("/investor/:investorid/download", downloadInvestorReportExcel);

// ---------------------- INTEREST REPORT ---------------------
router.get("/interest", getInterestReport);
router.get("/interest/download", downloadInterestReportExcel);

// ---------------------- PAYOUT REPORT -----------------------
router.get("/payout", getPayoutReport);
router.get("/payout/download", downloadPayoutReportCSV);

export default router;
