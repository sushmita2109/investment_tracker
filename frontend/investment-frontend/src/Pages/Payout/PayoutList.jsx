import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Dialog,
} from "@mui/material";
import EditPayout from "./EditPayout";
import AddPayoutHolder from "./AddPayoutHolder";

export default function PayoutList() {
  const [payouts, setPayouts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const loadPayouts = async () => {
    const res = await fetch("http://localhost:5544/api/payouts/all");
    const data = await res.json();
    console.log(data);
    setPayouts(data.data);
  };

  useEffect(() => {
    loadPayouts();
  }, []);

  //   const deletePayout = async (id) => {
  //     if (!window.confirm("Delete this payout detail?")) return;

  //     await fetch(`http://localhost:5544/api/payout/delete/${id}`, {
  //       method: "DELETE",
  //     });

  //     loadPayouts();
  //   };

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
        <Typography variant="h5">Payout List</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenAdd(true)}
          sx={{ backgroundColor: "black" }}
        >
          Add Payout
        </Button>
      </Box>

      {/* Add Investor Modal */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        maxWidth="sm"
        fullWidth
      >
        <AddPayoutHolder
          onSuccess={() => {
            setOpenAdd(false);
            loadPayouts();
          }}
        />
      </Dialog>
      {editData && (
        <EditPayout
          data={editData}
          onClose={() => setEditData(null)}
          onUpdate={loadPayouts}
        />
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Investor ID</TableCell>
            <TableCell>Holder Name</TableCell>
            <TableCell>Target Account Details</TableCell>
            {/* <TableCell>Account Number</TableCell>
            <TableCell>IFSC Code</TableCell>
            <TableCell>Account Type</TableCell>  */}
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {payouts.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.investorid}</TableCell>
              <TableCell>{p.holderName}</TableCell>
              <TableCell>{p.investment?.targetAccountDetails}</TableCell>
              {/* <TableCell>{p.accountNumber}</TableCell>
              <TableCell>{p.ifscCode}</TableCell>
              <TableCell>{p.accountType}</TableCell>  */}
              <TableCell>{p.amount}</TableCell>

              <TableCell>
                <Button onClick={() => setEditData(p)}>Edit</Button>
                {/* <Button color="error" onClick={() => deletePayout(p.id)}>
                  Delete
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
