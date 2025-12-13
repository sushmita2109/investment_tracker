import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  Typography,
  Box,
} from "@mui/material";
import EditInvestor from "./EditInvestor";
import AddInvestor from "./AddInvestorForm";

export default function InvestorsList() {
  const [investors, setInvestors] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const loadInvestors = async () => {
    const res = await fetch("http://localhost:5544/api/investors/all");
    const data = await res.json();
    setInvestors(data);
  };

  useEffect(() => {
    loadInvestors();
  }, []);

  const deleteInvestor = async (id) => {
    if (!window.confirm("Delete this investor?")) return;

    await fetch(`http://localhost:5544/api/investors/delete/${id}`, {
      method: "DELETE",
    });

    loadInvestors();
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          padding: "8px",
        }}
      >
        <Typography variant="h5">Investors</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenAdd(true)}
          sx={{ backgroundColor: "black" }}
        >
          Add Investor
        </Button>
      </Box>

      {/* Add Investor Modal */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        maxWidth="sm"
        fullWidth
      >
        <AddInvestor
          onSuccess={() => {
            setOpenAdd(false);
            loadInvestors();
          }}
        />
      </Dialog>

      {/* Edit Investor Popup */}
      {editData && (
        <EditInvestor
          data={editData}
          onClose={() => setEditData(null)}
          onUpdate={loadInvestors}
        />
      )}

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {investors
            .filter((inv) => inv.status === "active")
            .map((inv) => (
              <TableRow key={inv.userid}>
                <TableCell>{inv.firstname}</TableCell>
                <TableCell>{inv.lastname}</TableCell>
                <TableCell>{inv.phone}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditData(inv)}>Edit</Button>
                  <Button
                    color="error"
                    onClick={() => deleteInvestor(inv.userid)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}
