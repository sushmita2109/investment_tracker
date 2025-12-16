import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";


import investorRoutes from "./routes/investorRoutes.js";
import invesmentRoutes from "./routes/invesmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import payoutRoutes from "./routes/payoutRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import completePayoutRoutes from "./routes/completePayoutRoutes.js";
import { syncDB } from "./models/index.js";

const logger = (req, res, next) => {
  console.log("🔥 Route:", req.originalUrl);
  next();
};
const app = express();
syncDB()
app.use(cors());
app.use(express.json());

app.use(logger);
app.use("/api/auth", authRoutes);
app.use("/api/investors", investorRoutes);
app.use("/api/invesments", invesmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payouts", payoutRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/complete-payout", completePayoutRoutes);

app.get("/health-check", (req, res) => {
  res.send("Server is healthy");
});
app.listen(5544, () => console.log("Server running on port 5544"));
