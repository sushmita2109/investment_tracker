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
  Checkbox
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SkeletonTable from "../../Components/SkeletonTable";



export default function Reports() {
  const [reportType, setReportType] = useState("");
  const [investors, setInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState("");
  const [reportData, setReportData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [reportLoaded, setReportLoaded] = useState(false);
  const [paymentMarked, setPaymentMarked] = useState(false);
const [paidMonthRecords, setPaidMonthRecords] = useState([]);
const [loading, setLoading] = useState(false);
const showCheckbox =
  reportType === "payoutInvestor" || reportType === "payoutAll";


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
  const HIDDEN_COLUMNS = ["paymentDate", "createdAt", "updatedAt"];
  const isEditablePayout =
  reportType === "payoutInvestor" || reportType === "payoutAll";
  const EDITABLE_COLUMNS = ["payoutAmount", "tds", "actualAmount"];
 

  // Load investors
  const loadInvestors = async () => {
    const res = await fetch("http://localhost:5544/api/investors/all");
    const data = await res.json();
    setInvestors(data);
  };

  useEffect(() => {
    loadInvestors();
    if (!reportType) return;

  // investor-wise reports
  if (
    (reportType === "investor" || reportType === "payoutInvestor") &&
    !selectedInvestor
  ) {
    return;
  }

  // payout reports require month
  if (
    (reportType === "payoutInvestor" || reportType === "payoutAll") &&
    !selectedMonth
  ) {
    return;
  }

  loadReport();

  }, [reportType, selectedInvestor, selectedMonth]);

  // Fetch report based on type
  const loadReport = async () => {
     setLoading(true);
  setReportData([]);
  setReportLoaded(false);
   try {
    let url = "";

    if (reportType === "overall") url = "/api/reports/overall";
    if (reportType === "investor" && selectedInvestor)
      url = `/api/reports/investor/${selectedInvestor}`;
    if (reportType === "interest") url = "/api/reports/interest";
    if (reportType === "payout") url = "/api/complete-payout/all";
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
    console.log(data);

    // For overall summary → show object as a table row
    if (reportType === "overall") {
      setReportData([data.summary]);
    } else if (reportType === "investor") {
      setReportData(data.investments || []);
    } else if (reportType === "interest") {
      setReportData(data.report);
    } else if (reportType === "payout") {
      setReportData(data.records || []);
    } else 
      {
      setReportData(data.report || []);
    }

    setReportLoaded(true);
  } catch (err) {
    console.error("Load report error:", err);
  } finally {
    setLoading(false); // ✅ ALWAYS EXECUTES
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

  // ----------------------- MARK PAYMENT -----------------------------
  const handleMarkPayment = async () => {
  if (
    reportType !== "payoutInvestor" ||
    reportData.length === 0 ||
    !selectedMonth
  ) {
    alert("Please select month before marking payment");
    return;
  }

  const paidmonth = selectedMonth.format("MMM-YYYY");
  
  try {
    const payload = {
      payouts: reportData.map((item) => ({
        investorid: item.investorId,
        investmentId:item.investmentId,
        investorName: item.investorName,
         holdername:  item.holderName ,
        targetAccountDetails: item.targetAccountDetails, // OR item.investmentType
        amount: item.payoutAmount || item.amount,
        tds: item.tds,
        actualAmount: item.actualAmount,
        paidmonth: paidmonth, // 👈 MATCH MODEL
      })),
    };

    const res = await fetch(
      "http://localhost:5544/api/complete-payout/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Payment marked successfully!");
        setPaymentMarked(true);
    } else {
      alert("Failed to mark payment: " + data.message);
    }
  } catch (error) {
    console.error("Error marking payment:", error);
    alert("Error marking payment");
  }
};
const loadPaidMonthRecords = async () => {
  if (!selectedMonth || !selectedInvestor) return;

  const paidmonth = selectedMonth.format("MMM-YYYY");

    const url =
    reportType === "payoutAll"
      ? `http://localhost:5544/api/complete-payout/by-month/all?paidmonth=${paidmonth}`
      : `http://localhost:5544/api/complete-payout/by-month?investorid=${selectedInvestor}&paidmonth=${paidmonth}`;

  try {
    const res = await fetch(url);

    const data = await res.json();

    if (data.success) {
      console.log(data)
      setPaidMonthRecords(data.records);
      setReportData(data.records); // 👈 reuse table
    } else {
      alert("No records found for selected month");
    }
  } catch (err) {
    console.error(err);
    alert("Error loading paid records");
  }
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
            sx={{ mt: 2, width: 300 }}
            label="Select Investor"
            select
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
        {loading && (
    <SkeletonTable
      rows={5}
      columns={reportType === "overall" ? 4 : 8}
    />
  )}
        {!loading && reportData.length > 0 && (
          <Table
            // stickyHeader
            sx={{
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                {showCheckbox && (
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={
            reportData.some(r => r?.selected) &&
            !reportData.every(r => r?.selected)
          }
          checked={
            reportData.length > 0 &&
            reportData.every(r => r?.selected)
          }
          onChange={(e) => {
            const checked = e.target.checked;
            setReportData(prev =>
              prev.map(row => ({ ...row, selected: checked }))
            );
          }}
        />
      </TableCell>
    )}
                {Object.keys(reportData?.[0]||{})
            .filter((header) => !HIDDEN_COLUMNS.includes(header))
            .map((header) => (
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
                  {showCheckbox && (
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={
            reportData.some(r => r?.selected) &&
            !reportData.every(r => r?.selected)
          }
          checked={
            reportData.length > 0 &&
            reportData.every(r => r?.selected)
          }
          onChange={(e) => {
            const checked = e.target.checked;
            setReportData(prev =>
              prev.map(row => ({ ...row, selected: checked }))
            );
          }}
        />
      </TableCell>
    )}
                  {Object.keys(row)
              .filter((key) => !HIDDEN_COLUMNS.includes(key))
              .map((key) => (
                    <TableCell align="right" key={key}>
                     {isEditablePayout && EDITABLE_COLUMNS.includes(key) ? (
              <TextField
                size="small"
                type="number"
                value={row[key] ?? ""}
                onChange={(e) => {
                  const updated = [...reportData];
                  updated[index] = {
                    ...updated[index],
                    [key]: e.target.value,
                  };
                  setReportData(updated);
                }}
              />
            ) : (
              row[key]
            )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
         {!loading && reportData.length === 0 && (
    <Typography sx={{ mt: 2 }} color="text.secondary">
      No data to display
    </Typography>
  )}
      </TableContainer>
      <Box>
         {/* Month Picker - Optional */}
        { reportLoaded &&
        (reportType === "payoutInvestor" || reportType === "payoutAll") && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              label="Select Month & Year"
              value={selectedMonth}
              onChange={(newValue) => setSelectedMonth(newValue)}
              slotProps={{ textField: {  sx: { mt: 2 } } }}
            />
          </LocalizationProvider>
        )}
        {reportData.length > 0 && (reportType === "payoutInvestor"|| reportType=="payoutAll" )&& ( <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleMarkPayment} > Mark Payment </Button> )}
        {paymentMarked && selectedMonth && (reportType === "payoutInvestor" || reportType === "payoutAll") && (
  <Button
    variant="outlined"
    color="primary"
    sx={{ mt: 2, ml: 2 }}
    onClick={loadPaidMonthRecords}
  >
    View Paid Records ({selectedMonth.format("MMM-YYYY")})
  </Button>
)}
      </Box>
    </Paper>
  );
}
