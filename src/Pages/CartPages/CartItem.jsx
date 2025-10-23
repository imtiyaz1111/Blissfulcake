import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  styled,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { baseURL } from "../../Api/axiosIntance";
import { useCart } from "../../context/CartProvider";

// Styled Card
const CartItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
}));

const CartItem = ({ item, onQuantityChange, onRemove }) => {

  const theme = useTheme();
  const { product, quantity } = item;
  const [qty, setQty] = React.useState(quantity);

  // Sync local state if parent prop (item.quantity) changes after API update
  React.useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  const handleChange = (type) => {
    let newQty = qty;
    if (type === "add") newQty += 1;
    else if (type === "remove" && qty > 1) newQty -= 1;

    if (newQty !== qty) {
      setQty(newQty);
      // Call the prop function, which triggers the API context update
     onQuantityChange(product._id, newQty);
     
    }
  };

  // Correctly calculates the line total using the nested weights array price
  const lineTotal = (product.weights?.[0]?.price || 0) * qty;

  return (
    <CartItemCard>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", width: "100%" }}>
        <img
          src={`${baseURL}${product.image}`}
          alt={product.name}
          style={{
            width: 80,
            height: 80,
            borderRadius: theme.shape.borderRadius,
            marginRight: 16,
            objectFit: "cover",
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            SKU: {product._id}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            {product.flavor} | {product.weights?.[0]?.label}
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
            ₹{lineTotal.toFixed(2)}
          </Typography>
          <Button
            variant="text"
            color="error"
            size="small"
            onClick={() => onRemove(product._id)}
            sx={{ mt: 1 }}
          >
            Remove
          </Button>
        </Box>

        {/* Quantity Controls */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            onClick={() => handleChange("remove")}
            disabled={qty <= 1}
            sx={{ border: `1px solid ${theme.palette.divider}`, p: 0.5 }}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1.5 }}>
            {qty}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleChange("add")}
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
