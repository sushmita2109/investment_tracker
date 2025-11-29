import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import EditInvestor from "./EditInvestor";

export default function InvestorList() {
  const [investors, setInvestors] = useState([]);
  const [editData, setEditData] = useState(null);

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
    <div style={{ width: "100vw", overflowX: "auto", marginTop: "0px" }}>
      {editData && (
        <EditInvestor
          data={editData}
          onClose={() => setEditData(null)}
          onUpdate={loadInvestors}
        />
      )}

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
            .filter((inv) => inv.status == "active")
            .map((inv) => (
              <TableRow key={inv.userid}>
                <TableCell>{inv.firstname}</TableCell>
                <TableCell>{inv.lastname}</TableCell>
                <TableCell>{inv.phone}</TableCell>
                <TableCell>{inv.userid}</TableCell>
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
    </div>
  );
}
