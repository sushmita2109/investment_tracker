import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  MenuItem,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Select,
  FormControl,
  InputLabel,
  TableContainer,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Reports() {
  const [reportType, setReportType] = useState("");
  const [investors, setInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState("");
  const [reportData, setReportData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Load investors
  const loadInvestors = async () => {
    const res = await fetch("http://localhost:5544/api/investors/all");
    const data = await res.json();
    setInvestors(data);
  };

  useEffect(() => {
    loadInvestors();
  }, []);

  // Fetch report based on type
  const loadReport = async () => {
    let url = "";

    if (reportType === "overall") url = "/api/reports/overall";
    if (reportType === "investor" && selectedInvestor)
      url = `/api/reports/investor/${selectedInvestor}`;
    if (reportType === "interest") url = "/api/reports/interest";
    if (reportType === "payout") url = "/api/reports/payout";
    if (reportType === "payoutInvestor" && selectedInvestor) {
      const monthIndex = selectedMonth?.month();
      const month = MONTH_NAMES[monthIndex];
      const year = selectedMonth?.year();

      url = `/api/reports/payout/investor/${selectedInvestor}?month=${month}&year=${year}`;
    }
    if (reportType === "payoutAll") {
      const monthIndex = selectedMonth?.month();
      const month = MONTH_NAMES[monthIndex];
      const year = selectedMonth?.year();

      url = `/api/reports/payout/investors?month=${month}&year=${year}`;
    }

    const res = await fetch("http://localhost:5544" + url);
    const data = await res.json();

    // For overall summary → show object as a table row
    if (reportType === "overall") {
      setReportData([data.summary]);
      return;
    }

    // For investor report
    if (reportType === "investor") {
      setReportData(data.investments || []);

      return;
    }

    // For interest report
    if (reportType === "interest") {
      const rows = data.report.flatMap((r) => r.investments);
      setReportData(rows);
      return;
    }

    // For payouts
    if (reportType === "payout") {
      setReportData(data.report || []);
      return;
    }

    if (reportType === "payoutInvestor") {
      setReportData(data.report || []);
      // console.log("Payout Investor Report Data:", data);
      return;
    }
    if (reportType === "payoutAll") {
      setReportData(data.report || []);
      // console.log("Payout Investor Report Data:", data);
      return;
    }
  };

  // ------------------------ DOWNLOAD CSV ---------------------------
  const downloadCSV = () => {
    if (reportType === "overall") {
      window.open("http://localhost:5544/api/reports/overall/download");
      return;
    }

    if (reportType === "investor" && selectedInvestor) {
      window.open(
        `http://localhost:5544/api/reports/investor/${selectedInvestor}/download`
      );
      return;
    }

    if (reportType === "interest") {
      window.open("http://localhost:5544/api/reports/interest/download");
      return;
    }

    if (reportType === "payout") {
      window.open("http://localhost:5544/api/reports/payout/download");
      return;
    }

    if (reportType === "payoutInvestor" && selectedInvestor) {
      const monthIndex = selectedMonth?.month();
      const month = MONTH_NAMES[monthIndex];
      const year = selectedMonth?.year();

      window.open(
        `http://localhost:5544/api/reports/payout/investor/${selectedInvestor}/download?month=${month}&year=${year}`
      );
      return;
    }
    if (reportType === "payoutAll") {
      const monthIndex = selectedMonth?.month();
      const month = MONTH_NAMES[monthIndex];
      const year = selectedMonth?.year();

      window.open(
        `http://localhost:5544/api/reports/payout/investors/download?month=${month}&year=${year}`
      );
      return;
    }

    alert("Select a report type first.");
  };
  // ------------------------------------------------------------------

  return (
    <Paper
      sx={{
        padding: 3,
        width: "90%",
        margin: "auto",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Reports
      </Typography>
      <FormControl fullWidth>
        {/* Select Report Type */}
        <InputLabel id="select-report-type">Select Report Type</InputLabel>
        <Select
          label="select-report-type"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          sx={{
            width: 300,
          }}
        >
          <MenuItem value="overall">Overall Investment Summary</MenuItem>
          <MenuItem value="investor">Investor-wise Report</MenuItem>
          <MenuItem value="interest">Interest Report</MenuItem>
          <MenuItem value="payout">Payout Report</MenuItem>
          <MenuItem value="payoutInvestor">
            Payout Report (Individual Investor)
          </MenuItem>
          <MenuItem value="payoutAll">Payout Report (All Investors)</MenuItem>
        </Select>

        {/* Investor Dropdown */}
        {(reportType === "investor" || reportType === "payoutInvestor") && (
          <TextField
            sx={{ mt: 2 }}
            label="Select Investor"
            select
            fullWidth
            value={selectedInvestor}
            onChange={(e) => setSelectedInvestor(e.target.value)}
          >
            {investors.map((inv) => (
              <MenuItem key={inv.userid} value={inv.userid}>
                {inv.firstname} {inv.lastname} ({inv.userid})
              </MenuItem>
            ))}
          </TextField>
        )}
        {/* Month Picker - Optional */}
        {(reportType === "payoutInvestor" || reportType === "payoutAll") && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              label="Select Month & Year"
              value={selectedMonth}
              onChange={(newValue) => setSelectedMonth(newValue)}
              slotProps={{ textField: { fullWidth: true, sx: { mt: 2 } } }}
            />
          </LocalizationProvider>
        )}
      </FormControl>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Button variant="contained" sx={{ mt: 2 }} onClick={loadReport}>
          Load Report
        </Button>
        {reportData.length > 0 && (
          <Button variant="outlined" sx={{ mt: 2 }} onClick={downloadCSV}>
            Download CSV
          </Button>
        )}
      </Box>
      {/* REPORT TABLE */}
      <TableContainer>
        {reportData.length > 0 && (
          <Table
            // stickyHeader
            sx={{
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                {Object.keys(reportData[0])?.map((header) => (
                  <TableCell align="right" key={header}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {reportData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.keys(row).map((key) => (
                    <TableCell align="right" key={key}>
                      {row[key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Paper>
  );
}
