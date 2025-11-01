// src/pages/CheckoutSuccess.jsx
import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartProvider"; // assuming you have one

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { clearCartContext } = useCart();

  useEffect(() => {
    // ✅ Clear local cart after successful payment
    clearCartContext();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <CheckCircleIcon
          sx={{ fontSize: 100, color: "success.main", mb: 2 }}
        />
      </motion.div>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Payment Successful 🎉
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Thank you for your purchase! Your order has been successfully placed.
      </Typography>

      <Button
        variant="contained"
        
        sx={{ px: 4, py: 1.2,background:"linear-gradient(to right, #fdadbb, #f77f9e)" }}
        onClick={() => navigate("/profile/orders")}
      >
        View My Orders
      </Button>
    </Box>
  );
};

export default CheckoutSuccess;
