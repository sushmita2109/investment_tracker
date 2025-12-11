import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import About from "../Components/About";
import Title from "../Components/Title";

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
    <>
      <Title />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          background: "#f1f5f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Grid container spacing={3} maxWidth="900px" alignItems="stretch">
          {/* ABOUT CARD */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <About />
          </Grid>

          {/* SIGNUP FORM */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Paper
              sx={{
                padding: 4,
                borderRadius: 3,
                maxWidth: 360, // match About card width
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              elevation={3}
            >
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
                  sx={{ py: 1, backgroundColor: "#141414" }}
                >
                  Sign Up
                </Button>
              </form>

              <Typography variant="body2" mt={2} textAlign="center">
                Already have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/")}
                  sx={{ textDecoration: "none" }}
                >
                  Sign In
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
