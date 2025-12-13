import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AddInvestorForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    pan: "",
    address: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5544/api/investors/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error) return alert(data.error);

    alert("Investor Added Successfully");
    onSuccess(); // close popup + reload list
  };

  return (
    <Paper sx={{ padding: 3, position: "relative" }}>
      <IconButton
        onClick={onSuccess}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6">Add Investor</Typography>

      <TextField
        name="firstname"
        label="First Name"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />
      <TextField
        name="lastname"
        label="Last Name"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />
      <TextField
        name="phone"
        label="Phone"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />
      <TextField
        name="pan"
        label="PAN"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />
      <TextField
        name="address"
        label="Address"
        fullWidth
        sx={{ mt: 2 }}
        onChange={handleChange}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "black", flex: 1 }}
          onClick={handleSubmit}
        >
          Add Investment
        </Button>

        <Button
          variant="outlined"
          color="error"
          sx={{ flex: 1 }}
          onClick={onSuccess}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}
