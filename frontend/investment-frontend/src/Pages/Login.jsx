import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5544/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        console.log("Login successful:", data);

        // Save token
        localStorage.setItem("token", data.token);

        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
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
      <Paper sx={{ padding: 4, width: 360, borderRadius: 3 }} elevation={3}>
        <Typography variant="h5" mb={2} fontWeight={600}>
          Sign In
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            fullWidth
            type="password"
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mb: 2, py: 1 }}
          >
            Sign In
          </Button>
        </form>

        <Typography variant="body2" mt={2} textAlign="center">
          Don’t have an account?{" "}
          <Link component="button" onClick={() => navigate("/signup")}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
