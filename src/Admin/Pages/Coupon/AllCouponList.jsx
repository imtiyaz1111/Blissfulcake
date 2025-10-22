import React, { useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import { deleteCoupon, getAllCoupons } from "../../../Api/functions/couponFunction";
import { useAuth } from "../../../context/AuthProvider";

const AllCouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    if (token) getAllCoupons(setCoupons, setLoading, token);
  }, [token]);

  const handleDeleteClick = (coupon) => {
    setSelectedCoupon(coupon);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCoupon(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCoupon(selectedCoupon._id, token, () => {});
      setCoupons((prev) => prev.filter((c) => c._id !== selectedCoupon._id));
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setOpenDialog(false);
      setSelectedCoupon(null);
    }
  };

  const isExpired = (endDate) => new Date(endDate) < new Date();

  const filteredCoupons = coupons
    .filter((coupon) =>
      coupon.code?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.code.localeCompare(b.code)
        : b.code.localeCompare(a.code)
    );

  const paginatedCoupons = filteredCoupons.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredCoupons.length / rowsPerPage);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
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
            <DiscountIcon />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Coupon List
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Overview
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      {/* Search + Sort */}
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2} mb={3}>
        <TextField
          label="Search Coupon"
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

      {/* Coupon Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ background: "linear-gradient(135deg, #ff94a3, #f48fb1)" }}>
            <TableRow>
              <TableCell><strong>No</strong></TableCell>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Discount</strong></TableCell>
              <TableCell><strong>Start Date</strong></TableCell>
              <TableCell><strong>End Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCoupons.map((data, index) => (
              <TableRow key={data._id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Typography fontWeight="500">{data.code}</Typography>
                </TableCell>
                <TableCell>
                  {data.discountType === "percentage"
                    ? `${data.discountValue}%`
                    : `₹${data.discountValue}`}
                </TableCell>
                <TableCell>{new Date(data.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(data.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {isExpired(data.endDate)
                    ? <Chip label="Expired" color="error" size="small" />
                    : <Chip label="Active" color="success" size="small" />}
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Button
                      variant="outlined"
                      sx={{ borderColor: "#4caf50", color: "#4caf50" }}
                      size="small"
                      component={Link}
                      to={`/coupon/update/${data._id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(data)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {paginatedCoupons.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary">No coupons found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredCoupons.length > rowsPerPage && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" />
        </Box>
      )}

      {/* Delete Confirmation */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>Delete Coupon</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this coupon?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined" color="secondary">Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllCouponList;
