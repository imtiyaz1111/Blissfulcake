import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Card,
  styled,
  useTheme,
  TextField,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { verifyCoupon } from "../../Api/functions/couponFunction";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const SummaryCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  backgroundColor: "white",
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(4),
  },
}));

const shippingEstimate = 20.0;

const OrderSummary = ({ cartItems }) => {
  const theme = useTheme();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const token = auth?.token;

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.product.weights?.[0]?.price || 0) * item.quantity,
    0
  );

  const deliveryCharge = subtotal < 300 && subtotal > 0 ? 50 : 0;

  const estimatedTotalBeforeDiscount =
    subtotal + shippingEstimate + deliveryCharge;

  const estimatedTotal = Math.max(estimatedTotalBeforeDiscount - discount, 0);

  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const codeObj = {
      code: coupon.trim(),
      totalAmount: estimatedTotalBeforeDiscount,
    };

    verifyCoupon(codeObj, setDiscount, setLoading, token);
  };

  const SummaryRow = ({
    label,
    value,
    isTotal = false,
    isDiscount = false,
  }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: isTotal ? 0 : 1.5,
        mt: isTotal ? 2 : 0,
        
      }}
    >
      <Typography
        variant={isTotal ? "h6" : "body1"}
        fontWeight={isTotal ? 700 : 400}
        color={isDiscount ? theme.palette.success.main : "text.primary"}
      >
        {label}
      </Typography>
      <Typography
        variant={isTotal ? "h6" : "body1"}
        fontWeight={isTotal ? 700 : 400}
        color={
          isTotal
            ? theme.palette.error.main
            : isDiscount
            ? theme.palette.success.main
            : "text.primary"
        }
      >
        {isDiscount ? "- ₹" : "₹"}
        {value.toFixed(2)}
      </Typography>
    </Box>
  );

  return (
    <SummaryCard sx={{position: "sticky",
        top: "180px",}}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      <SummaryRow label="Subtotal" value={subtotal} />
      <SummaryRow label="Shipping Estimate" value={shippingEstimate} />
      {deliveryCharge > 0 && (
        <SummaryRow label="Delivery Charge" value={deliveryCharge} />
      )}
      {discount > 0 && (
        <SummaryRow label="Coupon Discount" value={discount} isDiscount />
      )}

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Enter coupon code"
          size="small"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          fullWidth
          disabled={loading}
        />
        <Button
          variant="contained"
          sx={{
            backgroundImage: "linear-gradient(to right, #fdadbb, #f77f9e)",
            px: 3,
          }}
          onClick={handleApplyCoupon}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Apply"}
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <SummaryRow label="Estimated Total" value={estimatedTotal} isTotal />

      <Button
        variant="contained"
        LinkComponent={Link}
        to={"/checkout"}
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          backgroundImage: "linear-gradient(to right, #fdadbb, #f77f9e)",
          borderRadius: 1,
        }}
      >
        Proceed to Checkout
      </Button>

      <Button
      LinkComponent={Link}
        to={"/shop"}
        variant="text"
        fullWidth
        sx={{ mt: 1, color: theme.palette.text.secondary }}
      >
        Continue Shopping
      </Button>
    </SummaryCard>
  );
};

export default OrderSummary;
