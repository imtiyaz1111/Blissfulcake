import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// ----------------------------------------------------
// 1. STYLED COMPONENTS AND CUSTOM THEME SETUP
// ----------------------------------------------------

// Custom Card for cart items
const CartItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
}));

// Custom Card for Order Summary
const SummaryCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  backgroundColor: "white", // Ensure it stands out against the light background
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(4),
  },
}));

// Dummy data for the cart items
const cartItems = [
  {
    id: 1,
    name: "Celebration Rainbow Cake",
    sku: "SRU/0522593",
    details: "SRU 1Jike 4B426B | Tall 3 Tier Cake",
    price: 109.0,
    quantity: 1,
    image: "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
  {
    id: 2,
    name: "Black Forrest Cake",
    sku: "SRU/028898",
    details: "SRU 1Jike 4B426B | Tall 3 Tier Cake",
    price: 89.0,
    quantity: 2,
    image: "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
  {
    id: 3,
    name: "Cartoon Character Pastries",
    sku: "SRU/402334",
    details: "SRU 1Jike 4B426B | Tall 3 Tier Cake",
    price: 49.0,
    quantity: 1,
    image: "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
];

const shippingEstimate = 20.0;
const taxRate = 0.05; // 5% tax

// ----------------------------------------------------
// 2. REUSABLE COMPONENTS
// ----------------------------------------------------

// Component for a single cart item
const CartItem = ({ item }) => {
  const theme = useTheme();

  // Calculation for line total
  const lineTotal = item.price * item.quantity;

  // State for quantity (for a functional component, would use Redux/Context for global state)
  const [quantity, setQuantity] = React.useState(item.quantity);

  const handleQuantityChange = (type) => {
    if (type === "add") {
      setQuantity((q) => q + 1);
    } else if (type === "remove" && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <CartItemCard>
      <Box sx={{ p: 2, display: "flex", alignItems: "center" , width:"100%"}}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: 80,
            height: 80,
            borderRadius: theme.shape.borderRadius,
            marginRight: 16,
            objectFit: "cover",
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" >
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            {item.sku}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            {item.details}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {/* Price/Remove/Quantity Controls for smaller screens */}
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                mr: 2,
                display: { xs: "block", md: "none" },
              }}
            >
              ${lineTotal.toFixed(2)}
            </Typography>
            <Button
              variant="text"
              color="error"
              size="small"
              sx={{
                p: 0,
                minWidth: "auto",
                fontSize: "0.8rem",
                display: { xs: "block", md: "none" },
              }}
            >
              Remove
            </Button>
          </Box>
          <Box
            onClick={() => console.log("Remove item")}
            sx={{
              mt: 1,
              cursor: "pointer",
              color: theme.palette.error.main,
              fontSize: "0.8rem",
              display: { xs: "none", md: "block" },
            }}
          >
            <Typography
              variant="caption"
              color="error"
              component="span"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              &gt; Remove
            </Typography>
          </Box>
        </Box>

        {/* Quantity Controls (Right side) */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            onClick={() => handleQuantityChange("remove")}
            disabled={quantity <= 1}
            sx={{ border: `1px solid ${theme.palette.divider}`, p: 0.5 }}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1.5 }}>
            {quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleQuantityChange("add")}
            sx={{ border: `1px solid ${theme.palette.divider}`, p: 0.5 }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </CartItemCard>
  );
};

// Component for Order Summary
const OrderSummary = ({ items }) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxAmount = subtotal * taxRate;
  const estimatedTotal = subtotal + shippingEstimate + taxAmount;
  const theme = useTheme();

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
        fontWeight={isTotal ? "bold" : "regular"}
      >
        {label}
      </Typography>
      <Typography
        variant={isTotal ? "h6" : "body1"}
        fontWeight={isTotal ? "bold" : "regular"}
        color={isTotal ? theme.palette.error.main : "text.primary"}
      >
        ${value.toFixed(2)}
      </Typography>
    </Box>
  );

  return (
    <SummaryCard>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      <SummaryRow label="Subtotal" value={subtotal} />
      <SummaryRow label="Shipping Estimate" value={shippingEstimate} />
      <SummaryRow label="Tax" value={taxAmount} />

      <Divider sx={{ my: 2 }} />

      <SummaryRow
        label="Estimated Total"
        value={estimatedTotal}
        isTotal={true}
      />

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

      <Button
        variant="text"
        fullWidth
        sx={{
          mt: 1,
          color: theme.palette.text.secondary,
        }}
      >
        Continue Shopping
      </Button>
    </SummaryCard>
  );
};

// ----------------------------------------------------
// 3. MAIN CART PAGE COMPONENT
// ----------------------------------------------------

const CartPage = () => {
  const theme = useTheme();
  // Using useMediaQuery for proper responsive structure
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Define the main background color from your UI
  const pageBackgroundColor = "#fcf0f5"; // A very light pink background

  return (
    <Box
      sx={{
        backgroundColor: pageBackgroundColor,
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Cart Header Area (Matches the design's pink header) */}
        <Box
          sx={{
            backgroundColor: "error.light", // Light pink/red from your header
            p: 3,
            mb: 4,
            borderRadius: theme.shape.borderRadius,
            backgroundImage: "linear-gradient(to right, #f77f9e,  #fdadbb)", // Gradient from your design
            color: "white",
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
            Your Cart
          </Typography>
          <Typography variant="subtitle1">
            ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in
            your cart)
          </Typography>
        </Box>

        {/* Cart Content - Responsive Grid */}
        <Grid container spacing={isTablet ? 2 : 4}>
          {/* Cart Items Column */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7, xl: 7 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                Items in Your Cart
              </Typography>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Box>
          </Grid>

          {/* Order Summary Column */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5, xl: 5 }}>
            <OrderSummary items={cartItems} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// To run this code, you would typically wrap it with a custom MUI theme
// to match your website's exact colors, but we use MUI's default 'error.main'
// to approximate the pink/red for the buttons and headers.

// Example of how to export and use (Assuming a default export)
export default CartPage;
