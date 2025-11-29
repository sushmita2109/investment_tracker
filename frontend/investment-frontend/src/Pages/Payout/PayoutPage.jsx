import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AddPayoutHolder from "./AddPayoutHolder";
import PayoutList from "./PayoutList";

export default function PayoutPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Add Payout Holder" />
        <Tab label="List Payouts" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <AddPayoutHolder open={true} isStandalone />}
        {tab === 1 && <PayoutList />}
      </Box>
    </Box>
  );
}
