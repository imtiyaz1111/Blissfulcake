import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Avatar,
  Chip,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";
import { Cake, CalendarMonth } from "@mui/icons-material";

const events = [
  {
    id: 1,
    customer: "Emma Watson",
    cakeType: "Red Velvet",
    occasion: "Birthday",
    deliveryDate: "2025-10-30",
    avatar: "https://i.ibb.co/tJhhmV4/cake2.jpg",
  },
  {
    id: 2,
    customer: "John Doe",
    cakeType: "Chocolate Truffle",
    occasion: "Anniversary",
    deliveryDate: "2025-10-29",
    avatar: "https://i.ibb.co/D4nBbz5/cake1.jpg",
  },
  {
    id: 3,
    customer: "Sophia Lee",
    cakeType: "Vanilla Cream",
    occasion: "Wedding",
    deliveryDate: "2025-11-01",
    avatar: "https://i.ibb.co/0sWmCfk/cake5.jpg",
  },
  {
    id: 4,
    customer: "Michael Smith",
    cakeType: "Strawberry Delight",
    occasion: "Birthday",
    deliveryDate: "2025-11-02",
    avatar: "https://i.ibb.co/02McznQ/cake4.jpg",
  },
  {
    id: 5,
    customer: "Lara Croft",
    cakeType: "Coffee Walnut",
    occasion: "Corporate Event",
    deliveryDate: "2025-11-03",
    avatar: "https://i.ibb.co/p4m3G4x/cake6.jpg",
  },
  {
    id: 6,
    customer: "David Kim",
    cakeType: "Blueberry Cheesecake",
    occasion: "Birthday",
    deliveryDate: "2025-11-05",
    avatar: "https://i.ibb.co/V9Rj6bH/cake7.jpg",
  },
  {
    id: 7,
    customer: "Rachel Green",
    cakeType: "Black Forest",
    occasion: "Wedding",
    deliveryDate: "2025-11-07",
    avatar: "https://i.ibb.co/YcxS6ZL/cake3.jpg",
  },
];

const UpcomingEventsOrders = () => {
  const [search, setSearch] = useState("");
  const [occasionFilter, setOccasionFilter] = useState("");
  const [page, setPage] = useState(1);

  const filteredEvents = events.filter(
    (event) =>
      event.customer.toLowerCase().includes(search.toLowerCase()) &&
      (occasionFilter ? event.occasion === occasionFilter : true)
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => setPage(value);

  const uniqueOccasions = [...new Set(events.map((e) => e.occasion))];

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
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
        sx={{
           color: "#d63384" ,
          borderBottom: "3px solid #f48fb1",
          display: "inline-block",
          pb: 0.5,

        }}
      >
        Upcoming Events / Orders
      </Typography>

      {/* --- Filter and Search --- */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <TextField
          label="Search Customer"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{
            minWidth: "250px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        />
        <TextField
          select
          label="Filter by Occasion"
          variant="outlined"
          size="small"
          value={occasionFilter}
          onChange={(e) => {
            setOccasionFilter(e.target.value);
            setPage(1);
          }}
          sx={{
            minWidth: "200px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueOccasions.map((oc) => (
            <MenuItem key={oc} value={oc}>
              {oc}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* --- Events Table --- */}
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
              <TableCell sx={{ fontWeight: 700, color: "#444" }}>
                Customer
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#444" }}>
                Cake Type / Flavor
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#444" }}>
                Occasion
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#444" }}>
                Delivery Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEvents.map((event) => (
              <TableRow
                key={event.id}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#fff3f7" },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      src={event.avatar}
                      alt={event.customer}
                      sx={{
                        width: 40,
                        height: 40,
                        border: "2px solid #f48fb1",
                      }}
                    />
                    <Typography fontWeight={600} color="#333">
                      {event.customer}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Cake sx={{ fontSize: 18, color: "#f48fb1" }} />
                    <Typography color="#555">{event.cakeType}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={event.occasion}
                    sx={{
                      backgroundColor:
                        event.occasion === "Birthday"
                          ? "#ffe0b2"
                          : event.occasion === "Wedding"
                          ? "#f3e5f5"
                          : event.occasion === "Anniversary"
                          ? "#c8e6c9"
                          : "#bbdefb",
                      color: "#000",
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarMonth sx={{ fontSize: 18, color: "#42a5f5" }} />
                    <Typography color="#555">{event.deliveryDate}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- Pagination --- */}
      {totalPages > 1 && (
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

export default UpcomingEventsOrders;
