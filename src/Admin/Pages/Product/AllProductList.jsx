import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Sample Product Data
const initialProducts = [
  {
    id: 1,
    name: "Chocolate Cake",
    category: "Cakes",
    price: 450,
    stock: 12,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
  },
  {
    id: 2,
    name: "Strawberry Pastry",
    category: "Pastries",
    price: 120,
    stock: 25,
    image: "https://images.unsplash.com/photo-1617196037281-2f53f8e95f98",
  },
  {
    id: 3,
    name: "Choco Chip Cookies",
    category: "Cookies",
    price: 200,
    stock: 40,
    image: "https://images.unsplash.com/photo-1605478572013-dc1eeb15bb7d",
  },
  {
    id: 4,
    name: "Dark Chocolate Box",
    category: "Chocolates",
    price: 800,
    stock: 8,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    id: 5,
    name: "French Baguette",
    category: "Breads",
    price: 150,
    stock: 18,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
  },
];

const AllProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination states
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Handle Delete
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleConfirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // Handle Edit (example only)
  const handleEdit = (product) => {
    alert(`Editing product: ${product.name}`);
  };

  // Filter + Search + Sort
  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // Pagination logic
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #ff94a3, #f48fb1)",
              color: "#fff",
              borderRadius: 2,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingCartIcon />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Product List
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Overview
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      {/* Search + Filter */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <TextField
          label="Search Product"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <TextField
          select
          label="Sort"
          variant="outlined"
          size="small"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="asc">A → Z</MenuItem>
          <MenuItem value="desc">Z → A</MenuItem>
        </TextField>
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead
            sx={{ background: "linear-gradient(135deg, #ff94a3, #f48fb1)" }}
          >
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Product Name</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Stock</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography fontWeight="500">{product.name}</Typography>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Button
                      variant="outlined"
                      sx={{ borderColor: "#4caf50", color: "#4caf50" }}
                      size="small"
                      component={Link}
                      to="/product/update"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(product)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {paginatedProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary">
                    No products found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredProducts.length > rowsPerPage && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllProductList;
