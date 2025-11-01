import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProduct } from "../../Api/functions/productFunctions"; // ✅ adjust import path
import { getAllCategories } from "../../Api/functions/categoriesFunction"; // ✅ adjust import path
import { baseURL } from "../../Api/axiosIntance";


const RecentlyAddedProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  // ✅ Fetch products
  useEffect(() => {
    getAllProduct(setAllProducts, setLoading);
  }, []);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        await getAllCategories(setCategoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Filter & paginate
  const filteredProducts = allProducts.filter(
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

  const handlePageChange = (event, value) => setPage(value);

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
                minWidth: 180,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ffc0cb" },
                  "&:hover fieldset": { borderColor: "#f48fb1" },
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {categoryLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : categoryList.length > 0 ? (
                categoryList.map((cat) => (
                  <MenuItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories found</MenuItem>
              )}
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
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={6}
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : (
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
                  paginatedProducts.map((product) => {
                    const priceData = product.weights?.[0];
                    const price = priceData
                      ? `₹${priceData.discountedPrice} (${priceData.label})`
                      : "-";
                    return (
                      <TableRow
                        key={product._id}
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
                            src={`${baseURL}${product.image}`}
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
                          {price}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              product.countInStock < 3
                                ? "#e53935"
                                : product.countInStock < 6
                                ? "#fbc02d"
                                : "#388e3c",
                            fontWeight: 600,
                          }}
                        >
                          {product.countInStock}
                        </TableCell>
                        <TableCell>
                          <Rating
                            value={product.ratings || 0}
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
                          {new Date(product.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })
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
          )}
        </TableContainer>

        {/* Pagination */}
        {!loading && filteredProducts.length > itemsPerPage && (
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
