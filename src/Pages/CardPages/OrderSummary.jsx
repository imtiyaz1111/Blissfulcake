import React from "react";
import { Box, Typography, Divider, Button, Card, styled, useTheme } from "@mui/material";

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
const taxRate = 0.05;

const OrderSummary = ({ items }) => {
const theme = useTheme();
const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
const taxAmount = subtotal * taxRate;
const estimatedTotal = subtotal + shippingEstimate + taxAmount;

const SummaryRow = ({ label, value, isTotal = false }) => (
<Box
sx={{
display: "flex",
justifyContent: "space-between",
mb: isTotal ? 0 : 1.5,
mt: isTotal ? 2 : 0,
}}
>
<Typography variant={isTotal ? "h6" : "body1"} fontWeight={isTotal ? "bold" : "regular"}>
{label} </Typography>
<Typography
variant={isTotal ? "h6" : "body1"}
fontWeight={isTotal ? "bold" : "regular"}
color={isTotal ? theme.palette.error.main : "text.primary"}
>
${value.toFixed(2)} </Typography> </Box>
);

return ( <SummaryCard>
<Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
Order Summary </Typography>

  <SummaryRow label="Subtotal" value={subtotal} />
  <SummaryRow label="Shipping Estimate" value={shippingEstimate} />
  <SummaryRow label="Tax" value={taxAmount} />

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
  >
    Proceed to Checkout
  </Button>

  <Button variant="text" fullWidth sx={{ mt: 1, color: theme.palette.text.secondary }}>
    Continue Shopping
  </Button>
</SummaryCard>


);
};

export default OrderSummary;
