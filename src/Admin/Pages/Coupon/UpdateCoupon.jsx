import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DiscountIcon from "@mui/icons-material/Discount";
import { toast } from "react-toastify";
import {
  getCouponById,
  updateCoupon,
} from "../../../Api/functions/couponFunction";
import { useAuth } from "../../../context/AuthProvider";

const UpdateCoupon = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [auth] = useAuth();
  const token = auth?.token;

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

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        setLoading(true);
        const data = await getCouponById(id, token);
        console.log("data", data);

        if (data) {
          setCoupon({
            code: data.code || "",
            discountType: data.discountType || "percentage",
            discountValue: data.discountValue || "",
            minPurchase: data.minPurchase || "",
            startDate: data.startDate ? data.startDate.slice(0, 16) : "",
            endDate: data.endDate ? data.endDate.slice(0, 16) : "",
            isActive: data.isActive ?? true,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch coupon details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id && token) fetchCoupon();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const validateForm = () => {
    if (!coupon.code.trim()) return toast.error("Coupon code is required");
    if (!coupon.discountType) return toast.error("Please select discount type");
    if (!coupon.discountValue || isNaN(coupon.discountValue))
      return toast.error("Discount value must be a valid number");
    if (!coupon.startDate || !coupon.endDate)
      return toast.error("Start and End date are required");
    if (new Date(coupon.startDate) > new Date(coupon.endDate))
      return toast.error("End date must be after start date");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    updateCoupon(id, coupon, token, setLoading, navigate);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <DiscountIcon sx={{ color: "#f48fb1" }} /> Update Coupon
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Update coupon details
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      <Paper
        sx={{
          maxWidth: "100%",
          mx: "auto",
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                label="Coupon Code"
                name="code"
                fullWidth
                value={coupon.code}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                select
                label="Discount Type"
                name="discountType"
                fullWidth
                value={coupon.discountType}
                onChange={handleChange}
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="flat">Flat</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                label="Discount Value"
                name="discountValue"
                type="number"
                fullWidth
                value={coupon.discountValue}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                label="Minimum Purchase"
                name="minPurchase"
                type="number"
                fullWidth
                value={coupon.minPurchase}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                label="Start Date"
                name="startDate"
                type="datetime-local"
                fullWidth
                value={coupon.startDate}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                label="End Date"
                name="endDate"
                type="datetime-local"
                fullWidth
                value={coupon.endDate}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              onClick={() => navigate("/coupon/manage")}
              variant="outlined"
              color="secondary"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#f48fb1" }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Coupon"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateCoupon;
