import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const menuBtnStyle = {
    color: "white",
    fontSize: "1rem",
    textTransform: "none",
    marginLeft: "20px",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ background: "#0f172a", paddingY: 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Investment Management
        </Typography>

        <Box>
          <Button sx={menuBtnStyle} onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>

          <Button sx={menuBtnStyle} onClick={() => navigate("/investors")}>
            Investors
          </Button>

          <Button sx={menuBtnStyle} onClick={() => navigate("/invesment")}>
            Investments
          </Button>

          <Button sx={menuBtnStyle} onClick={() => navigate("/payout")}>
            Payouts
          </Button>

          <Button sx={menuBtnStyle} onClick={() => navigate("/reports")}>
            Reports
          </Button>

          <Button sx={menuBtnStyle} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
