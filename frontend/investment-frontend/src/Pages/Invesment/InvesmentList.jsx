import React, { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
  Box,
  Typography,
  Dialog,
} from "@mui/material";
import EditInvestment from "./EditInvesment";
import AddInvesment from "./AddInvesment";

export default function InvesmentList() {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const load = async () => {
    const res = await fetch("http://localhost:5544/api/invesments/all");
    const json = await res.json();

    setList(json.data);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteInvestment = async (id) => {
    if (!window.confirm("Mark as completed?")) return;

    await fetch(`http://localhost:5544/api/invesments/delete/${id}`, {
      method: "DELETE",
    });

    load();
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
        <Typography variant="h5">Investment</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenAdd(true)}
          sx={{ backgroundColor: "black" }}
        >
          Add Investment
        </Button>
      </Box>

      {/* Add Investor Modal */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        maxWidth="sm"
        fullWidth
      >
        <AddInvesment
          onSuccess={() => {
            setOpenAdd(false);
            load();
          }}
        />
      </Dialog>
      {editData && (
        <EditInvestment
          data={editData}
          onClose={() => setEditData(null)}
          onUpdate={load}
        />
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Investor</TableCell>
            <TableCell>Invesment Type</TableCell>
            <TableCell>Target Account Details</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.investorid}</TableCell>
              <TableCell>{inv.invesmentType}</TableCell>
              <TableCell>{inv.targetAccountDetails}</TableCell>
              <TableCell>{inv.invesmentDate}</TableCell>
              <TableCell>{inv.amount}</TableCell>
              <TableCell>
                <Button onClick={() => setEditData(inv)}>Edit</Button>
                <Button color="error" onClick={() => deleteInvestment(inv.id)}>
                  Complete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
