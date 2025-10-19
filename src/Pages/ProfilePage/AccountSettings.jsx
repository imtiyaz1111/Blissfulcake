import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const AccountSettings = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Account Settings
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
        }}
      >
        <TextField label="Full Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Phone" variant="outlined" fullWidth />
        <Button
          variant="contained"
          sx={{
            backgroundImage: "linear-gradient(to right, #f77f9e, #fdadbb)",
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default AccountSettings;
