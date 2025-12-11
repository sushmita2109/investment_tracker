import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import sequelize from "./config/db.js";
import dotenv from "dotenv";
import investorRoutes from "./routes/investorRoutes.js";
import invesmentRoutes from "./routes/invesmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import payoutRoutes from "./routes/payoutRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const logger = (req, res, next) => {
  console.log("🔥 Inside reportRoutes:", req.originalUrl);
  next();
};

dotenv.config();
const app = express();
sequelize.sync();
app.use(cors());
app.use(express.json());

app.use(logger);
app.use("/api/auth", authRoutes);
app.use("/api/investors", investorRoutes);
app.use("/api/invesments", invesmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payouts", payoutRoutes);
app.use("/api/reports", reportRoutes);

app.get("/health-check", (req, res) => {
  res.send("Server is healthy");
});
app.listen(5544, () => console.log("Server running on port 5544"));
