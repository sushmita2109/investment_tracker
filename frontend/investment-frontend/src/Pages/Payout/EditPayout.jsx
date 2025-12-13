import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

export default function EditPayout({ data, onClose, onUpdate }) {
  const [form, setForm] = useState({
    investorid: data.investorid || "",
    holderName: data.holderName || "",
    bankName: data.bankName || "",
    accountNumber: data.accountNumber || "",
    ifscCode: data.ifscCode || "",
    accountType: data.accountType || "",
    amount: data.amount || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePayout = async () => {
    const res = await fetch(
      `http://localhost:5544/api/payouts/update/${data.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const json = await res.json();
    console.log("🚀 ~ savePayout ~ json:", json);

    if (json.success) {
      onUpdate(); // reload list
      onClose(); // close dialog
    } else {
      alert("Update failed");
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Payout Details</DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Investor ID"
          name="investorid"
          fullWidth
          value={form.investorid}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Holder Name"
          name="holderName"
          fullWidth
          value={form.holderName}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Bank Name"
          name="bankName"
          fullWidth
          value={form.bankName}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Account Number"
          name="accountNumber"
          fullWidth
          value={form.accountNumber}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          label="IFSC Code"
          name="ifscCode"
          fullWidth
          value={form.ifscCode}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Account Type"
          name="accountType"
          fullWidth
          select
          value={form.accountType}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          <MenuItem value="savings">Savings</MenuItem>
          <MenuItem value="current">Current</MenuItem>
        </TextField>

        <TextField
          label="Amount"
          name="amount"
          type="number"
          fullWidth
          value={form.amount}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          label="TDS"
          name="tds"
          type="number"
          fullWidth
          value={form.tds}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={savePayout}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
