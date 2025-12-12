import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, MenuItem } from "@mui/material";

export default function AddInvesment() {
  const [form, setForm] = useState({
    investorid: "",
    invesmentType: "",
    targetAccountDetails: "",
    amount: "",
    expectedReturnRate: "",
    invesmentDate: "",
  });
  const [investorList, setInvestorList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5544/api/investors/all")
      .then((res) => res.json())
      .then((data) => setInvestorList(data))
      .catch((err) => console.error("Error fetching investors:", err));
  }, []);

  const handleSubmit = async () => {
    await fetch("http://localhost:5544/api/invesments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      // Show investment success
      alert("Investment added!");

      // If auto payout created — show details
      if (data.autoPayout) {
        alert(
          `Auto-Payout Created!\n\n` +
            `Holder: ${data.autoPayout.holderName}\n` +
            `Amount: ₹${data.autoPayout.amount}\n` +
            `Investment ID: ${data.autoPayout.investmentId}`
        );
      }
    } else {
      alert(data.message || "Failed to add investment.");
    }
  };

  return (
    <Paper sx={{ p: 3, width: "50%", margin: "auto" }}>
      <Typography variant="h6">Add Investment</Typography>

      <TextField
        select
        label="Investor UserID"
        name="investorid"
        fullWidth
        sx={{ mt: 2 }}
        value={form.investorid || ""}
        onChange={(e) => setForm({ ...form, investorid: e.target.value })}
      >
        {investorList?.map((inv) => (
          <MenuItem key={inv.userid} value={inv.userid}>
            {inv.userid}-{inv.firstname}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Investment Type"
        name="investmentType"
        select
        fullWidth
        sx={{ mt: 2 }}
        value={form.invesmentType}
        onChange={(e) => setForm({ ...form, invesmentType: e.target.value })}
      >
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="pledge">Pledge</MenuItem>
      </TextField>

      <TextField
        label="Target Account Details"
        name="targetAccountDetails"
        select
        fullWidth
        sx={{ mt: 2 }}
        value={form.targetAccountDetails}
        onChange={(e) =>
          setForm({ ...form, targetAccountDetails: e.target.value })
        }
      >
        <MenuItem value="company">Company</MenuItem>
        <MenuItem value="own">Own</MenuItem>
      </TextField>

      <TextField
        label="Amount"
        name="amount"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <TextField
        label="Expected Return Rate"
        name="expectedReturnRate"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) =>
          setForm({ ...form, expectedReturnRate: e.target.value })
        }
      />

      <TextField
        label="Investment Date"
        type="date"
        fullWidth
        sx={{ mt: 2 }}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setForm({ ...form, invesmentDate: e.target.value })}
      />

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
        Add Investment
      </Button>
    </Paper>
  );
}
