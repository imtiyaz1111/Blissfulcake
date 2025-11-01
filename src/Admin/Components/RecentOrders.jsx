// src/components/Admin/RecentOrders.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Pagination,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllOrders } from "../../Api/functions/orderFunctions";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";

// ✅ Helper for status color
const getChipStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return { bg: "#d1e7dd", color: "#0f5132" };
    case "processing":
      return { bg: "#fff3cd", color: "#856404" };
    case "cancelled":
      return { bg: "#f8d7da", color: "#842029" };
    default:
      return { bg: "#e0e0e0", color: "#333" };
  }
};

// ✅ Helper for payment status color
const getPaymentChipStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return { bg: "#d1e7dd", color: "#0f5132" };
    case "failed":
      return { bg: "#f8d7da", color: "#842029" };
    default:
      return { bg: "#fff3cd", color: "#856404" };
  }
};

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;

  const [auth] = useAuth();
  const token = auth?.token;  

  // ✅ Fetch all orders
  useEffect(() => {
    if (!token) {
      toast.error("Please login as admin to view orders");
      return;
    }
    getAllOrders(setOrders, token, setLoading);
  }, [token]);

  // ✅ Filtering logic
  const filteredOrders = orders.filter((order) => {
    const customerName = order?.address?.fullName?.toLowerCase() || "";
    const productName =
      order?.items?.[0]?.productId?.name?.toLowerCase() ||
      order?.items?.[0]?.productName?.toLowerCase() ||
      "";
    const matchesSearch =
      customerName.includes(searchQuery.toLowerCase()) ||
      productName.includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All"
        ? true
        : order?.orderStatus?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // ✅ Pagination
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event, value) => setPage(value);

  return (
    <Box
      mt={6}
      sx={{
        background: "linear-gradient(180deg, #fff6f9 0%, #ffe6ee 100%)",
        border: "1px solid #ffd6e0",
        borderRadius: "20px",
        p: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
        sx={{
          color: "#d63384",
          borderBottom: "3px solid #f48fb1",
          display: "inline-block",
          pb: 0.5,
        }}
      >
        All Orders
      </Typography>

      {/* Filters */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <TextField
          size="small"
          placeholder="Search by customer or product..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#f48fb1" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            minWidth: "250px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffd6e0" },
              "&:hover fieldset": { borderColor: "#f48fb1" },
            },
          }}
        />

        <TextField
          select
          label="Filter by Status"
          variant="outlined"
          size="small"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          sx={{
            minWidth: "200px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </TextField>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress sx={{ color: "#f48fb1" }} />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fce4ec" }}>
                {[
                  "Order ID",
                  "Customer",
                  "Product",
                  "Date",
                  "Order Status",
                  "Payment Method",
                  "Payment Status",
                  "Amount",
                  "Address",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 700,
                      color: "#444",
                      fontFamily: "'Poppins', sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => {
                  const chip = getChipStyle(order?.orderStatus);
                  const payChip = getPaymentChipStyle(order?.paymentStatus);
                  const product = order?.items?.[0]?.productId;
                  const imageUrl = product?.image
                    ? `${import.meta.env.VITE_API_BASE_URL}${product.image}`
                    : "https://via.placeholder.com/80";

                  return (
                    <TableRow
                      key={order._id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "#fff3f7" },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      <TableCell>#{order._id.slice(-6)}</TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar
                            src={imageUrl}
                            alt={order?.address?.fullName}
                            sx={{
                              width: 40,
                              height: 40,
                              border: "2px solid #f48fb1",
                            }}
                          />
                          <Typography fontWeight={600} color="#333">
                            {order?.address?.fullName || "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        {product?.name ||
                          order?.items?.[0]?.productName ||
                          "N/A"}
                      </TableCell>

                      <TableCell>
                        {new Date(order?.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={order?.orderStatus || "N/A"}
                          sx={{
                            backgroundColor: chip.bg,
                            color: chip.color,
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>

                      <TableCell>{order?.paymentMethod || "N/A"}</TableCell>

                      <TableCell>
                        <Chip
                          label={order?.paymentStatus || "N/A"}
                          sx={{
                            backgroundColor: payChip.bg,
                            color: payChip.color,
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ fontWeight: 600, color: "#d63384" }}>
                        ₹{order?.totalAmount?.toLocaleString() || "0"}
                      </TableCell>

                      <TableCell>
                        <Tooltip
                          title={order?.address?.street || "No address"}
                          arrow
                          placement="top"
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: 200,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {order?.address?.street
                              ? `${order?.address?.city}, ${order?.address?.state}`
                              : "N/A"}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No matching orders found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Pagination */}
      {!loading && filteredOrders.length > rowsPerPage && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "8px",
                color: "#333",
              },
              "& .Mui-selected": {
                backgroundColor: "#f48fb1 !important",
                color: "#fff !important",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default RecentOrders;
