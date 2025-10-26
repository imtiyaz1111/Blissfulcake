import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Card,
  styled,
  useTheme,
} from "@mui/material";

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

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.product.weights?.[0]?.price || 0) * item.quantity,
    0
  );

  const deliveryCharge = subtotal < 300 && subtotal > 0 ? 50 : 0;

  const estimatedTotal = subtotal + shippingEstimate + deliveryCharge;

  const SummaryRow = ({ label, value, isTotal = false }) => (
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
        color="text.primary"
      >
        {label}
      </Typography>
      <Typography
        variant={isTotal ? "h6" : "body1"}
        fontWeight={isTotal ? 700 : 400}
        color={isTotal ? theme.palette.error.main : "text.primary"}
      >
        ₹{value.toFixed(2)}
      </Typography>
    </Box>
  );

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
  };

  return (
    <SummaryCard
      sx={{
        position: "sticky",
        top: "180px",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      <SummaryRow label="Subtotal" value={subtotal} />
      <SummaryRow label="Shipping Estimate" value={shippingEstimate} />
      {deliveryCharge > 0 && (
        <SummaryRow label="Delivery Charge" value={deliveryCharge} />
      )}

      <Divider sx={{ my: 2 }} />

      <SummaryRow label="Estimated Total" value={estimatedTotal} isTotal />

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          backgroundImage: "linear-gradient(to right, #fdadbb, #f77f9e)",
          borderRadius: 1,
        }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </SummaryCard>
  );
};

export default OrderSummary;
