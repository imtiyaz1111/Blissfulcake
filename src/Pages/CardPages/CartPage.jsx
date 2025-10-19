import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

// Dummy data for cart items
const cartItems = [
  {
    id: 1,
    name: "Celebration Rainbow Cake",
    sku: "SRU/0522593",
    details: "SRU 1Jike 4B426B | Tall 3 Tier Cake",
    price: 109.0,
    quantity: 1,
    image:
      "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
  {
    id: 2,
    name: "Black Forrest Cake",
    sku: "SRU/028898",
    details: "SRU 1Jike 4B426B | Tall 3 Tier Cake",
    price: 89.0,
    quantity: 2,
    image:
      "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
  {
    id: 3,
    name: "Cartoon Character Pastries",
    sku: "SRU/402334",
    details: "SRU 1Jike 4B426B | Tall 3 Tier Cake",
    price: 49.0,
    quantity: 1,
    image:
      "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
];

const CartPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const pageBackgroundColor = "#fcf0f5";

  return (
    <Box
      sx={{ backgroundColor: pageBackgroundColor, minHeight: "100vh", py: 4 }}
    >
      {" "}
      <Container maxWidth="lg">
        {/* Header */}
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
            Your Cart{" "}
          </Typography>{" "}
          <Typography variant="subtitle1">
            ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in
            your cart){" "}
          </Typography>{" "}
        </Box>

        {/* Grid Layout */}
        <Grid container spacing={isTablet ? 2 : 4}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7, xl: 7 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Items in Your Cart
            </Typography>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5, xl: 5 }}>
            <OrderSummary items={cartItems} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;
