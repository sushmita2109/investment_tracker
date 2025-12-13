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

export default function EditInvestor({ data, onClose, onUpdate }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    await fetch(`http://localhost:5544/api/investors/update/${data.userid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    onUpdate();
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Investor</DialogTitle>
      <DialogContent>
        <TextField
          name="firstname"
          label="First Name"
          fullWidth
          sx={{ mt: 2 }}
          value={formData.firstname}
          onChange={handleChange}
        />
        <TextField
          name="lastname"
          label="Last Name"
          fullWidth
          sx={{ mt: 2 }}
          value={formData.lastname}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Phone"
          fullWidth
          sx={{ mt: 2 }}
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          sx={{ mt: 2 }}
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="address"
          label="Address"
          fullWidth
          sx={{ mt: 2 }}
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          name="pan"
          label="PAN"
          fullWidth
          sx={{ mt: 2 }}
          value={formData.pan}
          onChange={handleChange}
        />
        {/* <TextField
          name="accountNumber"
          label="Account Number"
          fullWidth
          sx={{ mt: 2 }}
          value={formData.accountNumber || ""}
          onChange={handleChange}
        />

        {/* IFSC Code */}
        {/* <TextField
          name="ifscCode"
          label="IFSC Code"
          fullWidth
          sx={{ mt: 2 }}
          value={formData.ifscCode || ""}
          onChange={handleChange}
        /> */}
        {/* <TextField
          name="accountType"
          label="Account Type"
          select
          fullWidth
          sx={{ mt: 2 }}
          value={formData.accountType || ""}
          onChange={handleChange}
        >
          <MenuItem value="savings">Savings</MenuItem>
          <MenuItem value="current">Current</MenuItem>
        </TextField>{" "} */}
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
