// src/components/DataTable.js
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";

const DataTable = ({ data }) => {
  console.log("data", data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Electric Vehicle Details
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>VIN (1-10)</TableCell>
              <TableCell>DOL Vehicle ID</TableCell>
              <TableCell>Electric Range</TableCell>

              <TableCell>Model</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Model Year</TableCell>
              <TableCell>EV Type</TableCell>

              <TableCell>Electric Utility</TableCell>
              <TableCell>
                Clean Alternative Fuel Vehicle (CAFV) Eligibility
              </TableCell>
              <TableCell>2020 Census Tract</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item["VIN (1-10)"]}</TableCell>
                  <TableCell>{item["DOL Vehicle ID"]}</TableCell>
                  <TableCell>{item["Electric Range"]}</TableCell>

                  <TableCell>{item["Model"]}</TableCell>
                  <TableCell>{item["Make"]}</TableCell>
                  <TableCell>{item["Model Year"]}</TableCell>
                  <TableCell>{item["Electric Vehicle Type"]}</TableCell>
                  <TableCell>{item["Electric Utility"]}</TableCell>
                  <TableCell>
                    {item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]}
                  </TableCell>
                  <TableCell>{item["2020 Census Tract"]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  );
};

export default DataTable;
