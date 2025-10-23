import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const orders = [
  {
    id: "#ORD12345",
    product: "Chocolate Truffle Cake",
    date: "2025-10-10",
    price: "$79",
  },
  {
    id: "#ORD12346",
    product: "Red Velvet Cake",
    date: "2025-09-25",
    price: "$89",
  },
];

const OrderList = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        p: { xs: 2, sm: 4 },
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3, color: "#333" }}>
        My Orders
      </Typography>

      {orders.map((order, index) => (
        <Grid
          key={index}
          container
          spacing={2}
          alignItems="center"
          sx={{
            mb: 2,
            borderBottom: "1px solid #eee",
            pb: 2,
            "&:last-child": { borderBottom: "none" },
          }}
        >
          <Grid item xs={12} sm={4}>
            <Typography fontWeight={600}>{order.product}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography color="text.secondary">{order.id}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography color="text.secondary">{order.date}</Typography>
          </Grid>
          <Grid item xs={6} sm={2} textAlign="right">
            <Typography fontWeight={600}>{order.price}</Typography>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

export default OrderList;
