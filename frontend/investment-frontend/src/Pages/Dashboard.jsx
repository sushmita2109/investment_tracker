import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalInvestors: 0,
    totalInvestments: 0,
    activeInvestments: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats from API
    fetch("http://localhost:5544/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.error("Dashboard load error:", err));
  }, []);

  const cardStyle = {
    padding: "20px",
    borderRadius: "12px",
    height: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    background: "white",
  };

  const numberStyle = {
    fontSize: "2.2rem",
    fontWeight: 700,
    color: "#1e293b",
  };

  const labelStyle = {
    fontSize: "1rem",
    color: "#64748b",
    fontWeight: 500,
  };

  return (
    <Box
      sx={{
        padding: 4,
        background: "#f1f5f9",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 700, color: "#0f172a" }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Investors */}
        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <Typography sx={labelStyle}>Total Investors</Typography>
            <Typography sx={numberStyle}>{stats.totalInvestors}</Typography>
          </Paper>
        </Grid>

        {/* Total Investments */}
        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <Typography sx={labelStyle}>Total Investments</Typography>
            <Typography sx={numberStyle}>{stats.totalInvestments}</Typography>
          </Paper>
        </Grid>

        {/* Active Investments */}
        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <Typography sx={labelStyle}>Active Investments</Typography>
            <Typography sx={numberStyle}>{stats.activeInvestments}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
