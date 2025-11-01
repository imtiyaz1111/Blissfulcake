// src/pages/Profile/OrderList.jsx
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
import { getUserOrders } from "../../../Api/functions/orderFunctions";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const token = auth?.token;
  const navigate = useNavigate();

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ Fetch orders from API
  useEffect(() => {
    if (token) {
      getUserOrders(setOrders, token, setLoading);
    }
  }, [token]);

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        p: { xs: 2, sm: 4 },
        mt: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 3, color: "#333", textAlign: "left" }}
      >
        My Orders
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <Loading />
        </Box>
      ) : orders.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No orders found.
        </Typography>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Items</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Total Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Payment Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Order Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow
                    key={order._id}
                    hover
                    onClick={() => navigate(`/profile/orders/${order._id}`)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell sx={{ color: "#555" }}>
                      #{order._id.slice(-6)}
                    </TableCell>
                    <TableCell>
                      {order.items.map((item, idx) => (
                        <Box key={idx}>
                          <Typography variant="body2" fontWeight={500}>
                            {item.productName}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Qty: {item.quantity} × ₹{item.price}
                          </Typography>
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      ₹{order.totalAmount}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.paymentStatus}
                        color={
                          order.paymentStatus === "Paid"
                            ? "success"
                            : order.paymentStatus === "Pending"
                            ? "warning"
                            : "default"
                        }
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.orderStatus}
                        color={
                          order.orderStatus === "Processing"
                            ? "info"
                            : order.orderStatus === "Delivered"
                            ? "success"
                            : order.orderStatus === "Cancelled"
                            ? "error"
                            : "default"
                        }
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={orders.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}
    </Paper>
  );
};

export default OrderList;
