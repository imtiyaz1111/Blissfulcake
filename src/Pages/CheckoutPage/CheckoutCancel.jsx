// src/pages/CheckoutCancel.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CheckoutCancel = () => {
  const navigate = useNavigate();

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
        <CancelOutlinedIcon sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
      </motion.div>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Payment Cancelled ❌
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Your payment was not completed. Don’t worry — your cart is still saved.
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ px: 4, py: 1.2 }}
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.2 }}
          onClick={() => navigate("/checkout")}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutCancel;
