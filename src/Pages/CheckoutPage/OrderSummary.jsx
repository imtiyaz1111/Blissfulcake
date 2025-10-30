// src/components/Checkout/OrderSummary.jsx

import React, { useState } from "react";
import { Box, Typography, Divider, Button, Card, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { createOrder } from "../../Api/functions/orderFunctions";
import { createCheckoutSession } from "../../Api/functions/paymentFunctions";

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

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.product.weights?.[0]?.price || 0) * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > 0 && subtotal < freeShippingThreshold ? deliveryChargeAmount : 0;
  const estimatedTotal = subtotal + deliveryCharge + shippingEstimate;

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
        };
        await createOrder(payload, token, setLoading, navigate);
      } else {
        // Stripe Checkout Flow
        toast.info("Redirecting to secure Stripe checkout...");
        const sessionData = await createCheckoutSession(cartItems, token, email);
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

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">₹{estimatedTotal.toFixed(2)}</Typography>
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
