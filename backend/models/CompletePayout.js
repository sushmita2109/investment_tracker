import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CompletePayout = sequelize.define(
  "CompletePayout",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    investorid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    investorName: {
      type: DataTypes.STRING,
    },
    holdername:{
   type:DataTypes.STRING,
    },
   targetAccountDetails: {
      type: DataTypes.ENUM("company", "own"),
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    tds: {
      type: DataTypes.FLOAT,
    },
    actualAmount: {
      type: DataTypes.FLOAT,
    },
    paidmonth: {
      type: DataTypes.STRING,
    },
    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
 
  },
  {
    tableName: "complete_payout",
    timestamps: true,
  }
);

export default CompletePayout;
