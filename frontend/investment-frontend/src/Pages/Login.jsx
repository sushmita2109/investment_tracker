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
    <>
      <Title />

      <Box
        sx={{
          height: "calc(100vh - 64px)", // FIX ✔
          width: "100vw",
          background: "#f1f5f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "64px", // push content below AppBar ✔
          p: 2,
        }}
      >
        <Grid container spacing={3} maxWidth="1000px" alignItems="stretch">
          {/* ABOUT */}
          <Grid item xs={12} md={6}>
            <About />
          </Grid>

          {/* LOGIN */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 4,
                borderRadius: 3,
                height: "100%",
                maxWidth: 360,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              elevation={3}
            >
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
                  type="password"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ mb: 2, backgroundColor: "#141414" }}
                >
                  Sign In
                </Button>
              </form>

              <Typography variant="body2" mt={2} textAlign="center">
                Don’t have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/signup")}
                  sx={{ textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
