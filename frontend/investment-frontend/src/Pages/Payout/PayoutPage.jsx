import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
// import AddPayoutHolder from "./AddPayoutHolder";
import PayoutList from "./PayoutList";

export default function PayoutPage() {
  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <PayoutList />
    </Box>
  );
}
