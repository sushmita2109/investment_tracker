import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5544/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f1f5f9",
        width: "100vw",
      }}
    >
      <Paper sx={{ padding: 4, width: 400, borderRadius: 3 }} elevation={3}>
        <Typography variant="h5" mb={2} fontWeight={600}>
          Create an Account
        </Typography>

        <form onSubmit={handleSignup}>
          <TextField
            label="User Name"
            name="username"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.username}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ py: 1, mt: 1 }}
          >
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" mt={2} textAlign="center">
          Already have an account?{" "}
          <Link component="button" onClick={() => navigate("/")}>
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
