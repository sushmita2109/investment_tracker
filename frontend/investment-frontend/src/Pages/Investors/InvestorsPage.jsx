import React from "react";
import { Box } from "@mui/material";
import InvestorList from "./InvestorsList";

export default function InvestorsPage() {
  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <InvestorList />
    </Box>
  );
}
