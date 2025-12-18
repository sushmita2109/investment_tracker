import { Paper,Skeleton } from "@mui/material";

const cardStyle = {
  padding: "20px",
  borderRadius: "12px",
  height: "140px",
  display: "flex",
  width:"140px",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  backgroundColor: "#ffffff",
};


export const DashboardCardSkeleton = () => (
  <Paper sx={cardStyle}>
    <Skeleton variant="text" width="60%" height={20} />
    <Skeleton variant="text" width="40%" height={40} sx={{ mt: 1 }} />
  </Paper>
);
