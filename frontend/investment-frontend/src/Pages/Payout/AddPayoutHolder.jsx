import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, MenuItem } from "@mui/material";

export default function AddPayoutHolder() {
  const [form, setForm] = useState({
    investorid: "",
    holderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "savings",
    amount: "",
  });
  const [investorList, setInvestorList] = useState([]);
  const [investmentList, setInvestmentList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5544/api/investors/all")
      .then((res) => res.json())
      .then((data) => setInvestorList(data))
      .catch((err) => console.error("Error fetching investors:", err));
  }, []);

  const loadInvestmentsForInvestor = async (investorid) => {
    try {
      const res = await fetch(
        `http://localhost:5544/api/invesments/${investorid}`
      );
      const data = await res.json();
      setInvestmentList(data.investments || []);
    } catch (err) {
      console.log("Error loading investments:", err);
    }
  };

  const handleInvestorChange = (e) => {
    const investorid = e.target.value;

    setForm({
      ...form,
      investorid,
      investmentId: "", // reset investment when investor changes
    });

    loadInvestmentsForInvestor(investorid);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5544/api/payouts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      alert(data.message || "Payout Added Successfully");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add payout");
    }
  };

  return (
    <Paper sx={{ padding: 3, width: "50%", margin: "auto" }}>
      <Typography variant="h6">Add Payout Holder Details</Typography>

      <TextField
        select
        label="Investor UserID"
        name="investorid"
        fullWidth
        sx={{ mt: 2 }}
        value={form.investorid || ""}
        onChange={handleInvestorChange}
      >
        {investorList?.map((inv) => (
          <MenuItem key={inv.userid} value={inv.userid}>
            {inv.userid}-{inv.firstname}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        name="investmentId"
        fullWidth
        sx={{ mt: 2 }}
        label="Select Invesment Id"
        value={form.investmentId}
        onChange={handleChange}
      >
        {investmentList.map((inv) => (
          <MenuItem key={inv.id} value={inv.id}>
            {inv.id} - {inv.targetAccountDetails} (₹{inv.amount})
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="holderName"
        label="Holder Name"
        fullWidth
        required
        sx={{ mt: 2 }}
        value={form.holderName}
        onChange={handleChange}
      />

      <TextField
        name="bankName"
        label="Bank Name"
        fullWidth
        sx={{ mt: 2 }}
        value={form.bankName}
        onChange={handleChange}
      />

      <TextField
        name="accountNumber"
        label="Account Number"
        fullWidth
        sx={{ mt: 2 }}
        value={form.accountNumber}
        onChange={handleChange}
      />

      <TextField
        name="ifscCode"
        label="IFSC Code"
        fullWidth
        sx={{ mt: 2 }}
        value={form.ifscCode}
        onChange={handleChange}
      />

      <TextField
        name="accountType"
        label="Account Type"
        select
        fullWidth
        sx={{ mt: 2 }}
        value={form.accountType}
        onChange={handleChange}
      >
        <MenuItem value="savings">Savings</MenuItem>
        <MenuItem value="current">Current</MenuItem>
      </TextField>

      <TextField
        name="amount"
        label="Amount"
        type="number"
        fullWidth
        sx={{ mt: 2 }}
        value={form.amount}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Add Payout
      </Button>
    </Paper>
  );
}
