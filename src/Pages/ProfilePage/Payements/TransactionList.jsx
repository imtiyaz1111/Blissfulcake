import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const TransactionList = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Transaction List
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography>No transactions yet.</Typography>
      </Paper>
    </Box>
  );
};

export default TransactionList;
