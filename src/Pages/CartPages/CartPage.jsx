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
import { useCart } from "../../context/CartProvider";
import Loading from "../../components/Loading/Loading"

const CartPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const pageBackgroundColor = "#fcf0f5";

  // FIX: Destructure the cart items, loading, and context action functions
  const {
    cart: cartItems, // Renamed to cartItems from the context for clarity
    loading,
    updateCartItemContext,
    removeFromCartContext,
    fetchCart,
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

  // Calls the context function to update quantity (persists to API)
  const handleQuantityChange =async (productId, newQty) => {
   await updateCartItemContext(productId, newQty);
    await fetchCart()
  };

  // Calls the context function to remove item (persists to API)
  const handleRemove =async (productId) => {
   await removeFromCartContext(productId);
   await fetchCart()
  };

  const itemCount = cartItems.length;

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
            Your Cart
          </Typography>
          <Typography variant="subtitle1">
            ({itemCount} {itemCount === 1 ? "Item" : "Items"} in your cart)
          </Typography>
        </Box>

        <Grid container spacing={isTablet ? 2 : 4}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7, xl: 7 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Items in Your Cart
            </Typography>
            {itemCount > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <Typography variant="h6" color="text.secondary">
                No items in cart. Start shopping!
              </Typography>
            )}
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

export default CartPage;
