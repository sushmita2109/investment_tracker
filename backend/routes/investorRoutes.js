import express from "express";
import {
  addInvestor,
  getInvestors,
  deleteAdmin,
  updateInvestor,
  listInvestors,
} from "../controller/investorController.js";

const router = express.Router();

router.post("/add", addInvestor);
router.put("/update/:id", updateInvestor);
router.get("/all", getInvestors);
router.get("/list", listInvestors);
router.delete("/delete/:id", deleteAdmin);

export default router;
