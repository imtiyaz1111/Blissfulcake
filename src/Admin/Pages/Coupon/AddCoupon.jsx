import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DiscountIcon from "@mui/icons-material/Discount";
import { toast } from "react-toastify";
import { createCoupon } from "../../../Api/functions/couponFunction";
import { useAuth } from "../../../context/AuthProvider";

const AddCoupon = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const token = auth.token;

  const [coupon, setCoupon] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    if (!coupon.code.trim()) {
      toast.error("Coupon code is required");
      return false;
    }
    if (!coupon.discountType) {
      toast.error("Please select discount type");
      return false;
    }
    if (!coupon.discountValue || isNaN(coupon.discountValue)) {
      toast.error("Discount value must be a valid number");
      return false;
    }
    if (!coupon.startDate || !coupon.endDate) {
      toast.error("Start and End date are required");
      return false;
    }
    if (new Date(coupon.startDate) > new Date(coupon.endDate)) {
      toast.error("End date must be after start date");
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    createCoupon(coupon, navigate, setLoading, token);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <DiscountIcon color="primary" /> Add New Coupon
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Fill coupon details
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      {/* Form */}
      <Paper
        sx={{
          maxWidth: "100%",
          mx: "auto",
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "#fff",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                label="Coupon Code"
                name="code"
                value={coupon.code}
                onChange={handleChange}
                fullWidth
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                select
                label="Discount Type"
                name="discountType"
                value={coupon.discountType}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="percentage">Percentage (%)</MenuItem>
                <MenuItem value="flat">Flat Amount (₹)</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                type="number"
                label="Discount Value"
                name="discountValue"
                value={coupon.discountValue}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                type="number"
                label="Minimum Purchase (optional)"
                name="minPurchase"
                value={coupon.minPurchase}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                type="datetime-local"
                label="Start Date & Time"
                name="startDate"
                value={coupon.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                type="datetime-local"
                label="End Date & Time"
                name="endDate"
                value={coupon.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.2,
                  fontSize: "16px",
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #ff94a3, #f48fb1)",
                }}
              >
                {loading ? "Creating Coupon..." : "Publish Coupon"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddCoupon;
