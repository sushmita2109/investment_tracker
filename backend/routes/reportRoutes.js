import express from "express";
import {
  getOverallSummary,
  downloadOverallSummaryExcel,
  getInvestorReport,
  downloadInvestorReportExcel,
  getInterestReport,
  downloadInterestReportExcel,
  getPayoutReport,
  downloadPayoutReportCSV,
  getPayoutReportForInvestor,
  downloadPayoutReportForInvestorExcel,
  getPayoutReportForAllInvestors,
  downloadPayoutReportForAllInvestorsExcel,
} from "../controller/reportController.js";

const router = express.Router();

// ---------------------- OVERALL SUMMARY ----------------------
router.get("/overall", getOverallSummary);
router.get("/overall/download", downloadOverallSummaryExcel);

// ---------------------- INVESTOR REPORT ---------------------
router.get("/investor/:investorid", getInvestorReport);
router.get("/investor/:investorid/download", downloadInvestorReportExcel);

// ---------------------- INTEREST REPORT ---------------------
router.get("/interest", getInterestReport);
router.get("/interest/download", downloadInterestReportExcel);

// ---------------------- PAYOUT REPORT -----------------------

router.get("/payout/investors", getPayoutReportForAllInvestors);
router.get(
  "/payout/investors/download",
  downloadPayoutReportForAllInvestorsExcel
);
router.get("/payout/investor/:investorid", getPayoutReportForInvestor);
router.get(
  "/payout/investor/:investorid/download",
  downloadPayoutReportForInvestorExcel
);

router.get("/payout", getPayoutReport);
router.get("/payout/download", downloadPayoutReportCSV);

export default router;
