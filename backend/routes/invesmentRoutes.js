import express from "express";
import {
  addInvesment,
  listInvesments,
  deleteInvestment,
  getAllInvestments,
  updateInvestment,
  getInvestmentsByInvestor,
} from "../controller/invesmentController.js";

const router = express.Router();

router.post("/add", addInvesment);
router.get("/all", getAllInvestments);
router.get("/list", listInvesments);
router.put("/update/:id", updateInvestment);
router.delete("/delete/:id", deleteInvestment);
router.get("/:investorid", getInvestmentsByInvestor);

export default router;
