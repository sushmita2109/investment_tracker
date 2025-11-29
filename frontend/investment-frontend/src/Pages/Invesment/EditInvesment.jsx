import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

export default function EditInvestment({ data, onClose, onUpdate }) {
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    await fetch(`http://localhost:5544/api/invesments/update/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onUpdate();
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Investment</DialogTitle>
      <DialogContent>
        {/* Investor UserID */}
        <TextField
          name="investorid"
          label="Investor UserID"
          fullWidth
          sx={{ mt: 2 }}
          value={form.investorid}
          onChange={handleChange}
        />

        {/* Investment Type */}
        <TextField
          name="invesmentType"
          label="Investment Type"
          select
          fullWidth
          sx={{ mt: 2 }}
          value={form.invesmentType}
          onChange={handleChange}
        >
          <MenuItem value="cash">Cash</MenuItem>
          <MenuItem value="pledge">Pledge</MenuItem>
        </TextField>

        {/* Target Account */}
        <TextField
          name="targetAccountDetails"
          label="Target Account"
          select
          fullWidth
          sx={{ mt: 2 }}
          value={form.targetAccountDetails}
          onChange={handleChange}
        >
          <MenuItem value="company">Company</MenuItem>
          <MenuItem value="own">Own</MenuItem>
        </TextField>

        {/* Amount */}
        <TextField
          name="amount"
          label="Amount"
          fullWidth
          type="number"
          sx={{ mt: 2 }}
          value={form.amount}
          onChange={handleChange}
        />

        {/* Investment Date */}
        <TextField
          name="invementDate"
          label="Investment Date"
          type="date"
          fullWidth
          sx={{ mt: 2 }}
          value={form.invementDate?.slice(0, 10)}
          onChange={handleChange}
        />

        {/* Expected Return Rate */}
        <TextField
          name="expectedReturnRate"
          label="Expected Return Rate"
          fullWidth
          type="number"
          sx={{ mt: 2 }}
          value={form.expectedReturnRate}
          onChange={handleChange}
        />

        {/* Maturity Date */}
        <TextField
          name="maturityDate"
          label="Maturity Date"
          type="date"
          fullWidth
          sx={{ mt: 2 }}
          value={form.maturityDate?.slice(0, 10)}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={saveChanges}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
