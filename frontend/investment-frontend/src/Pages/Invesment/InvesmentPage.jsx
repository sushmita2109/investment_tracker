import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AddInvesment from "./AddInvesment";
import InvesmentList from "./InvesmentList";

export default function InvesmentPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Add Invesment" />
        <Tab label="List Invvesment" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <AddInvesment />}
        {tab === 1 && <InvesmentList />}
      </Box>
    </Box>
  );
}
