import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getOrderById } from "../../../Api/functions/orderFunctions";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OrderDetails = () => {
  const { id } = useParams();
  const [auth] = useAuth();
  const token = auth?.token;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && token) {
      getOrderById(id, token, setOrder, setLoading);
    }
  }, [id, token]);

  const handleDownloadInvoice = () => {
    if (!order) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 30);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 38);
    doc.text(`Payment: ${order.paymentMethod}`, 14, 46);
    doc.text(`Status: ${order.paymentStatus}`, 14, 54);

    // Table
    const tableData = order.items.map((item) => [
      item.productName,
      item.quantity,
      `₹${item.price}`,
      `₹${item.quantity * item.price}`,
    ]);

    doc.autoTable({
      startY: 65,
      head: [["Product", "Qty", "Price", "Total"]],
      body: tableData,
    });

    // Total
    doc.text(
      `Total Amount: ₹${order.totalAmount}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`Invoice_${order._id}.pdf`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Typography textAlign="center" mt={5}>
        Order not found.
      </Typography>
    );
  }

  return (
    <Box >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: { xs: 2, sm: 4 },
          backgroundColor: "#fff",
          
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Typography variant="h6" fontWeight={600}>
            Order Details
          </Typography>
          <Button variant="contained" onClick={handleDownloadInvoice}>
            Download Invoice
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Order Info */}
        <Typography variant="subtitle1" fontWeight={600}>
          Order ID: #{order._id.slice(-6)}
        </Typography>
        <Typography color="text.secondary">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Address Section */}
        {order.address && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              <Typography fontWeight={600}>
                {order.address.fullName}
              </Typography>
              <Typography>{order.address.street}</Typography>
              <Typography>
                {order.address.city}, {order.address.state} -{" "}
                {order.address.postalCode}
              </Typography>
              <Typography>{order.address.country}</Typography>
              <Typography sx={{ mt: 0.5 }}>
                📞 {order.address.phone}
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Items Section */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ordered Items
          </Typography>

          {order.items.map((item, idx) => (
            <Paper
              key={idx}
              variant="outlined"
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight={500}>{item.productName}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography color="text.secondary" variant="body2">
                    Qty: {item.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography fontWeight={600}>
                    ₹{item.quantity * item.price}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Summary Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Typography>Total Amount: ₹{order.totalAmount}</Typography>
          <Typography>Payment Method: {order.paymentMethod}</Typography>

          <Typography sx={{ mt: 1 }}>
            Payment Status:{" "}
            <Chip
              label={order.paymentStatus}
              color={
                order.paymentStatus === "Paid"
                  ? "success"
                  : order.paymentStatus === "Pending"
                  ? "warning"
                  : "default"
              }
              size="small"
              sx={{ textTransform: "capitalize", ml: 1 }}
            />
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Order Status:{" "}
            <Chip
              label={order.orderStatus}
              color={
                order.orderStatus === "Processing"
                  ? "info"
                  : order.orderStatus === "Delivered"
                  ? "success"
                  : order.orderStatus === "Cancelled"
                  ? "error"
                  : "default"
              }
              size="small"
              sx={{ textTransform: "capitalize", ml: 1 }}
            />
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderDetails;
