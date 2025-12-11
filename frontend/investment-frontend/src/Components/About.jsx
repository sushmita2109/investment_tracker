import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Card
      sx={{
        padding: 3,
        borderRadius: 3,
        maxWidth: 360,
        width: "100%",
        height: "100%", // ✔ ensures it aligns perfectly
      }}
      elevation={3}
    >
      <CardContent>
        <Typography variant="h3" fontWeight={700} mb={2}>
          IRDS
        </Typography>

        <Typography paragraph>
          IRDS Technology, incorporated in June 2022, is a trading solution
          provider with a team of experienced and passionate intellectuals
          focused on delivering innovative trading solutions.
        </Typography>

        <Typography>
          We are committed to quality, efficiency, innovation, and timeliness of
          our deliverables with a high focus on maximum customer satisfaction.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default About;
