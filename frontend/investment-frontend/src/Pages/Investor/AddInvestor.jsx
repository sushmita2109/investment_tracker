import React, { useState } from "react";
import { TextField, Button, Paper, Typography, MenuItem } from "@mui/material";

export default function AddInvestor() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    pan: "",
    address: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "savings",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5544/api/investors/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message || "Investor Added Successfully");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Paper sx={{ padding: 3, width: "50%", margin: "auto" }}>
      <Typography variant="h6">Add Investor</Typography>

      <TextField
        id="firstname"
        name="firstname"
        label="First Name"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <TextField
        id="lastname"
        name="lastname"
        label="Last Name"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <TextField
        id="phone"
        name="phone"
        label="Phone"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <TextField
        id="pan"
        name="pan"
        label="PAN"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <TextField
        id="address"
        name="address"
        label="Address"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <TextField
        id="accountNumber"
        name="accountNumber"
        label="Account Number"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <TextField
        id="ifscCode"
        name="ifscCode"
        label="IFSC Code"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <TextField
        id="accountType"
        name="accountType"
        label="Account Type"
        select
        fullWidth
        sx={{ mt: 2 }}
        value={formData.accountType}
        onChange={handleChange}
      >
        <MenuItem value="savings">Savings</MenuItem>
        <MenuItem value="current">Current</MenuItem>
      </TextField>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Add Investor
      </Button>
    </Paper>
  );
}
