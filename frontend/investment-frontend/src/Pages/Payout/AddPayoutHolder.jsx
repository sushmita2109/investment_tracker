import React, { useState } from "react";
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
        name="investorid"
        label="Investor UserID"
        fullWidth
        sx={{ mt: 2 }}
        value={form.investorid}
        onChange={handleChange}
      />

      <TextField
        name="holderName"
        label="Account Holder Name"
        fullWidth
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
