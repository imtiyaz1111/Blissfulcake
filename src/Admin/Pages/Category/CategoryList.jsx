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
import CategoryIcon from "@mui/icons-material/Category";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";

const initialCategories = [
  {
    id: 1,
    title: "Cakes",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
  },
  {
    id: 2,
    title: "Pastries",
    image: "https://images.unsplash.com/photo-1617196037281-2f53f8e95f98",
  },
  {
    id: 3,
    title: "Cookies",
    image: "https://images.unsplash.com/photo-1605478572013-dc1eeb15bb7d",
  },
  {
    id: 4,
    title: "Chocolates",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    id: 5,
    title: "Breads",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
  },
  {
    id: 6,
    title: "Ice Creams",
    image: "https://images.unsplash.com/photo-1625944582462-8bcbf2a2745f",
  },
  {
    id: 7,
    title: "Muffins",
    image: "https://images.unsplash.com/photo-1509440159598-4a5d3cbb9f09",
  },
];

const CategoryTable = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination states
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Handle Delete
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = () => {
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  // Handle Edit (example only)
  const handleEdit = (category) => {
    alert(`Editing category: ${category.title}`);
  };

  // Filter + Search + Sort
  const filteredCategories = categories
    .filter((cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  // Pagination logic
  const paginatedCategories = filteredCategories.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

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
            <CategoryIcon />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Category List
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
          label="Search Category"
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

      {/* Category Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ background: "linear-gradient(135deg, #ff94a3, #f48fb1)" }}>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>
                  <img
                    src={category.image}
                    alt={category.title}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography fontWeight="500">{category.title}</Typography>
                </TableCell>
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
                      to="/category/update"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(category)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {paginatedCategories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">
                    No categories found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredCategories.length > rowsPerPage && (
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
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
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

export default CategoryTable;
