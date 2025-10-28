import React, { useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Sample data
const recentOrders = [
  {
    id: "#1023",
    customer: "John Doe",
    product: "Chocolate Cake",
    date: "Oct 25, 2025",
    status: "Delivered",
    amount: "$45.00",
    image: "https://i.ibb.co/D4nBbz5/cake1.jpg",
  },
  {
    id: "#1024",
    customer: "Emma Watson",
    product: "Vanilla Cupcake",
    date: "Oct 26, 2025",
    status: "Pending",
    amount: "$25.00",
    image: "https://i.ibb.co/tJhhmV4/cake2.jpg",
  },
  {
    id: "#1025",
    customer: "Michael Smith",
    product: "Red Velvet Cake",
    date: "Oct 27, 2025",
    status: "Cancelled",
    amount: "$55.00",
    image: "https://i.ibb.co/YcxS6ZL/cake3.jpg",
  },
  {
    id: "#1026",
    customer: "Sophia Lee",
    product: "Fruit Cake",
    date: "Oct 27, 2025",
    status: "Delivered",
    amount: "$60.00",
    image: "https://i.ibb.co/02McznQ/cake4.jpg",
  },
  {
    id: "#1027",
    customer: "David Kim",
    product: "Black Forest Cake",
    date: "Oct 28, 2025",
    status: "Pending",
    amount: "$40.00",
    image: "https://i.ibb.co/0sWmCfk/cake5.jpg",
  },
  {
    id: "#1028",
    customer: "Lara Croft",
    product: "Butter Cake",
    date: "Oct 29, 2025",
    status: "Delivered",
    amount: "$50.00",
    image: "https://i.ibb.co/p4m3G4x/cake6.jpg",
  },
  {
    id: "#1029",
    customer: "Chris Evans",
    product: "Chocolate Tart",
    date: "Oct 30, 2025",
    status: "Pending",
    amount: "$35.00",
    image: "https://i.ibb.co/82bX58y/cake7.jpg",
  },
  {
    id: "#1030",
    customer: "Scarlett Johansson",
    product: "Strawberry Cake",
    date: "Oct 30, 2025",
    status: "Cancelled",
    amount: "$48.00",
    image: "https://i.ibb.co/hmRmtbQ/cake8.jpg",
  },
];

// Helper for status color
const getChipStyle = (status) => {
  switch (status) {
    case "Delivered":
      return { bg: "#d1e7dd", color: "#0f5132" };
    case "Pending":
      return { bg: "#fff3cd", color: "#856404" };
    case "Cancelled":
      return { bg: "#f8d7da", color: "#842029" };
    default:
      return { bg: "#e0e0e0", color: "#333" };
  }
};

const RecentOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const filteredOrders = recentOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ? true : order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        Recent Orders
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
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
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
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fce4ec" }}>
              {["Order ID", "Customer", "Product", "Date", "Status", "Amount"].map(
                (head) => (
                  <TableCell
                    key={head}
                    sx={{ fontWeight: 700, color: "#444", fontFamily: "'Poppins', sans-serif" }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => {
                const chip = getChipStyle(order.status);
                return (
                  <TableRow
                    key={order.id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#fff3f7" },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          src={order.image}
                          alt={order.customer}
                          sx={{
                            width: 40,
                            height: 40,
                            border: "2px solid #f48fb1",
                          }}
                        />
                        <Typography fontWeight={600} color="#333">
                          {order.customer}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        sx={{
                          backgroundColor: chip.bg,
                          color: chip.color,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#d63384" }}>
                      {order.amount}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No matching orders found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredOrders.length > rowsPerPage && (
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
