import React, { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
} from "@mui/material";
import EditInvestment from "./EditInvesment";

export default function InvesmentList() {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);

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
    <div style={{ width: "100vw", overflowX: "auto", marginTop: "0px" }}>
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
    </div>
  );
}
