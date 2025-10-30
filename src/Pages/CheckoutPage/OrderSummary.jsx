// src/components/Checkout/OrderSummary.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Card,
  styled,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { createOrder } from "../../Api/functions/orderFunctions";
import { createCheckoutSession } from "../../Api/functions/paymentFunctions";
import { verifyCoupon } from "../../Api/functions/couponFunction";

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
const freeShippingThreshold = 300;
const deliveryChargeAmount = 50;

const OrderSummary = ({ cartItems, selectedAddress, paymentMethod }) => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const token = auth?.token;
  const email = auth?.user?.email;
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.product.weights?.[0]?.price || 0) * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > 0 && subtotal < freeShippingThreshold ? deliveryChargeAmount : 0;

  const estimatedTotalBeforeDiscount =
    subtotal + deliveryCharge + shippingEstimate;

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

    verifyCoupon(codeObj, setDiscount, setCouponLoading, token);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !paymentMethod) {
      toast.error("Please select address and payment method.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty.");
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === "cod") {
        const payload = {
          items: cartItems.map((item) => ({
            productId: item.product._id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.product.weights?.[0]?.price,
          })),
          totalAmount: estimatedTotal,
          paymentMethod: "COD",
          address: selectedAddress,
          paymentStatus: "Pending",
          orderStatus: "Processing",
          discountApplied: discount > 0 ? discount : 0,
          couponCode: coupon || null,
        };

        await createOrder(payload, token, setLoading, navigate);
      } else {
        toast.info("Redirecting to Stripe checkout...");
        const sessionData = await createCheckoutSession(
          cartItems,
          token,
          email,
          selectedAddress,
          discount,
          coupon
        );

        if (sessionData?.checkoutUrl) {
          window.location.href = sessionData.checkoutUrl;
        } else {
          toast.error("Failed to initialize payment session.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SummaryCard sx={{ position: "sticky", top: "180px" }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography>Subtotal</Typography>
        <Typography>₹{subtotal.toFixed(2)}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography>Shipping Estimate</Typography>
        <Typography>₹{shippingEstimate.toFixed(2)}</Typography>
      </Box>

      {deliveryCharge > 0 && (
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Delivery Charge</Typography>
          <Typography>₹{deliveryCharge.toFixed(2)}</Typography>
        </Box>
      )}

      {discount > 0 && (
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography color="success.main">Coupon Discount</Typography>
          <Typography color="success.main">- ₹{discount.toFixed(2)}</Typography>
        </Box>
      )}

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Enter coupon code"
          size="small"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          fullWidth
          disabled={couponLoading}
        />
        <Button
          variant="contained"
          sx={{
            backgroundImage: "linear-gradient(to right, #fdadbb, #f77f9e)",
            px: 3,
          }}
          onClick={handleApplyCoupon}
          disabled={couponLoading}
        >
          {couponLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Apply"
          )}
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6" color="error.main">
          ₹{estimatedTotal.toFixed(2)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          backgroundImage: "linear-gradient(to right, #fdadbb, #f77f9e)",
          borderRadius: 1,
        }}
        disabled={loading || !selectedAddress || cartItems.length === 0}
        onClick={handlePlaceOrder}
      >
        {loading ? "Processing..." : "Place Order"}
      </Button>
    </SummaryCard>
  );
};

export default OrderSummary;
