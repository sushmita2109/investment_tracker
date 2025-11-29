import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import EditPayout from "./EditPayout";

export default function PayoutList() {
  const [payouts, setPayouts] = useState([]);
  const [editData, setEditData] = useState(null);

  const loadPayouts = async () => {
    const res = await fetch("http://localhost:5544/api/payouts/all");
    const data = await res.json();
    // console.log(data);
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
    <div style={{ width: "100vw", overflowX: "auto", marginTop: "0px" }}>
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
            <TableCell>Bank Name</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>IFSC Code</TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {payouts.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.investorid}</TableCell>
              <TableCell>{p.holderName}</TableCell>
              <TableCell>{p.bankName}</TableCell>
              <TableCell>{p.accountNumber}</TableCell>
              <TableCell>{p.ifscCode}</TableCell>
              <TableCell>{p.accountType}</TableCell>
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
    </div>
  );
}
