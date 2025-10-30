import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartProvider";
import Loading from "../../components/Loading/Loading";
import CheckInfo from "./CheckInfo";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// ✅ Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { cart: cartItems, loading } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");

  if (loading)
    return (
    
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
    );

  return (
    <Elements stripe={stripePromise}>
      <Box sx={{ backgroundColor: "#fcf0f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundImage: "linear-gradient(to right, #f77f9e, #fdadbb)",
            p: 3,
            mb: 4,
            borderRadius: theme.shape.borderRadius,
            color: "white",
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
            Checkout
          </Typography>
        </Box>

        <Grid container spacing={isTablet ? 2 : 4}>
          <Grid item xs={12} lg={7}>
            <CheckInfo
              onAddressSelect={(address) => setSelectedAddress(address)}
              onPaymentChange={(method) => setPaymentMethod(method)}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <OrderSummary
              cartItems={cartItems}
              selectedAddress={selectedAddress}
              paymentMethod={paymentMethod}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </Elements>
    
  );
};

export default CheckoutPage;
