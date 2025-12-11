import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const Title = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      hello
      <AppBar position="fixed" sx={{ backgroundColor: "#141414 " }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            IRDS Technology
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Title;
