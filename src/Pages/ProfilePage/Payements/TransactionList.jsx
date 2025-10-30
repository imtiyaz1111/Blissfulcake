import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { getUserTransactions } from "../../../Api/functions/transactionFunctions";
import { useAuth } from "../../../context/AuthProvider";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const token = auth?.token;

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (token) {
      getUserTransactions(setTransactions, token, setLoading);
    }
  }, [token]);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 2, color: "#333" }}
      >
        Transaction List
      </Typography>

      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: "#fff",
          boxShadow: 2,
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : transactions.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" py={3}>
            No transactions yet.
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {transactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tx) => (
                      <TableRow key={tx._id} hover>
                        {/* Transaction ID */}
                        <TableCell sx={{ color: "#555" }}>
                          {tx.transactionId}
                        </TableCell>

                        {/* Order ID */}
                        <TableCell sx={{ color: "#555" }}>
                          {tx.orderId ? `${tx.orderId}` : "N/A"}
                        </TableCell>

                        {/* Amount */}
                        <TableCell sx={{ fontWeight: 600 }}>₹{tx.amount}</TableCell>

                        {/* Payment Method */}
                        <TableCell>{tx.paymentMethod}</TableCell>

                        {/* Status */}
                        <TableCell>
                          <Chip
                            label={tx.status}
                            color={
                              tx.status === "Success"
                                ? "success"
                                : tx.status === "Failed"
                                ? "error"
                                : "warning"
                            }
                            size="small"
                          />
                        </TableCell>

                        {/* Date */}
                        <TableCell>
                          {new Date(tx.createdAt).toLocaleDateString()}{" "}
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            {new Date(tx.createdAt).toLocaleTimeString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ✅ Pagination Controls */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                mt: 2,
                borderTop: "1px solid #eee",
              }}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default TransactionList;
