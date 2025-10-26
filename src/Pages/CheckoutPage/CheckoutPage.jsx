import React from "react";
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
import Loading from "../../components/Loading/Loading"
import CheckInfo from "./CheckInfo";

const CheckoutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const pageBackgroundColor = "#fcf0f5";

  // FIX: Destructure the cart items, loading, and context action functions
  const {
    cart: cartItems, // Renamed to cartItems from the context for clarity
    loading,
  } = useCart();

  // Display loading state while fetching cart data
  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: pageBackgroundColor,
          minHeight: "100vh",
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading/>
      </Box>
    );
  }


  return (
    <Box
      sx={{ backgroundColor: pageBackgroundColor, minHeight: "100vh", py: 4 }}
    >
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
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7, xl: 7 }}>
           <CheckInfo/>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5, xl: 5 }}>
            {/* Pass the items array to OrderSummary */}
            <OrderSummary cartItems={cartItems} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
