import React from "react";
import { Box, Typography, Button, IconButton, Card, styled, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Styled Card for each item
const CartItemCard = styled(Card)(({ theme }) => ({
display: "flex",
marginBottom: theme.spacing(3),
borderRadius: theme.shape.borderRadius,
boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
}));

const CartItem = ({ item }) => {
const theme = useTheme();
const [quantity, setQuantity] = React.useState(item.quantity);

const handleQuantityChange = (type) => {
if (type === "add") setQuantity((q) => q + 1);
else if (type === "remove" && quantity > 1) setQuantity((q) => q - 1);
};

const lineTotal = item.price * quantity;

return ( <CartItemCard>
<Box sx={{ p: 2, display: "flex", alignItems: "center", width: "100%" }}>
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
<Box sx={{ flexGrow: 1 }}> <Typography variant="subtitle1" fontWeight="bold">
{item.name} </Typography>
<Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
{item.sku} </Typography>
<Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
{item.details} </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Typography variant="body1" fontWeight="bold" sx={{ mr: 2, display: { xs: "block", md: "none" } }}>
          ${lineTotal.toFixed(2)}
        </Typography>
        <Button
          variant="text"
          color="error"
          size="small"
          sx={{ p: 0, minWidth: "auto", fontSize: "0.8rem", display: { xs: "block", md: "none" } }}
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

    {/* Quantity Controls */}
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

export default CartItem;
