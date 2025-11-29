import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AddInvestor from "./AddInvestor";
import InvestorList from "./InvestorList";

export default function InvestorsPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Add Investor" />
        <Tab label="List Investors" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <AddInvestor />}
        {tab === 1 && <InvestorList />}
      </Box>
    </Box>
  );
}
