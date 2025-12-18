import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonTable({
  rows = 5,
  columns = 6,
  headerWidth = 80,
  rowHeight = 20,
}) {
  return (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          {Array.from({ length: columns }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton variant="text" width={headerWidth} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton
                  variant="rectangular"
                  height={rowHeight}
                  animation="wave"
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
