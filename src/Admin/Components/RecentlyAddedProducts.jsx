import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  MenuItem,
  Pagination,
  Rating,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const products = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    category: "Chocolate",
    image: "https://i.ibb.co/D4nBbz5/cake1.jpg",
    price: "$25",
    stock: 5,
    rating: 4.8,
    addedOn: "2025-10-25",
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    category: "Red Velvet",
    image: "https://i.ibb.co/tJhhmV4/cake2.jpg",
    price: "$30",
    stock: 2,
    rating: 4.6,
    addedOn: "2025-10-22",
  },
  {
    id: 3,
    name: "Black Forest Cake",
    category: "Forest",
    image: "https://i.ibb.co/YcxS6ZL/cake3.jpg",
    price: "$28",
    stock: 12,
    rating: 4.4,
    addedOn: "2025-10-20",
  },
  {
    id: 4,
    name: "Strawberry Delight Cake",
    category: "Strawberry",
    image: "https://i.ibb.co/02McznQ/cake4.jpg",
    price: "$27",
    stock: 3,
    rating: 4.2,
    addedOn: "2025-10-24",
  },
  {
    id: 5,
    name: "Vanilla Cream Cake",
    category: "Vanilla",
    image: "https://i.ibb.co/0sWmCfk/cake5.jpg",
    price: "$22",
    stock: 8,
    rating: 4.1,
    addedOn: "2025-10-21",
  },
  {
    id: 6,
    name: "Coffee Walnut Cake",
    category: "Coffee",
    image: "https://i.ibb.co/p4m3G4x/cake6.jpg",
    price: "$26",
    stock: 1,
    rating: 4.7,
    addedOn: "2025-10-26",
  },
  {
    id: 7,
    name: "Blueberry Cheesecake",
    category: "Cheesecake",
    image: "https://i.ibb.co/V9Rj6bH/cake7.jpg",
    price: "$29",
    stock: 4,
    rating: 4.9,
    addedOn: "2025-10-27",
  },
];

const RecentlyAddedProducts = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true)
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <Box mt={4}>
      <Paper
        sx={{
          p: 3,
          borderRadius: "20px",
          background: "linear-gradient(180deg, #fff9fc 0%, #ffeef6 100%)",
          boxShadow: "0 6px 20px rgba(255, 182, 193, 0.25)",
          border: "1px solid #ffd6e0",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={3}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: "#c2185b",
              fontFamily: "'Poppins', sans-serif",
              mb: { xs: 2, sm: 0 },
            }}
          >
            🍰 Recently Added Products
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            {/* Search Input */}
            <TextField
              size="small"
              placeholder="Search product..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#e91e63" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                minWidth: 240,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ffc0cb" },
                  "&:hover fieldset": { borderColor: "#f48fb1" },
                },
              }}
            />

            {/* Category Filter */}
            <TextField
              select
              size="small"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                minWidth: 150,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ffc0cb" },
                  "&:hover fieldset": { borderColor: "#f48fb1" },
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #ffd6e0",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(90deg, #ffb6c1, #f48fb1)",
                }}
              >
                {[
                  "Image",
                  "Product Name",
                  "Category",
                  "Price",
                  "Stock",
                  "Rating",
                  "Date Added",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    hover
                    sx={{
                      backgroundColor: "#fff",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#fff0f6",
                      },
                    }}
                  >
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={product.image}
                        alt={product.name}
                        sx={{
                          width: 56,
                          height: 56,
                          border: "2px solid #ffb6c1",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontWeight={600}
                        sx={{
                          color: "#880e4f",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {product.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          color: "#ad1457",
                        }}
                      >
                        {product.category}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#d81b60",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {product.price}
                    </TableCell>
                    <TableCell
                      sx={{
                        color:
                          product.stock < 3
                            ? "#e53935"
                            : product.stock < 6
                            ? "#fbc02d"
                            : "#388e3c",
                        fontWeight: 600,
                      }}
                    >
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <Rating
                        value={product.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#6a1b9a",
                      }}
                    >
                      {product.addedOn}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No matching products found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="secondary"
              shape="rounded"
              size="medium"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#ad1457",
                },
                "& .Mui-selected": {
                  backgroundColor: "#f48fb1 !important",
                  color: "#fff !important",
                },
              }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RecentlyAddedProducts;
