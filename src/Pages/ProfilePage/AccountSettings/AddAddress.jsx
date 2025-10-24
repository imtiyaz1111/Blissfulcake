import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { createAddress } from "../../../Api/functions/addressFunctions";

const AddAddress = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const token = auth?.token;
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    createAddress(formData, token, navigate, setLoading);
  };

  return (
    <Box sx={{ p: 1, maxWidth: "100%" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Add New Address
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: "100%",
          margin: "0 auto",
          borderRadius: 3,
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={6}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={3}>
              {/* Full Name */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Phone */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Street */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* State */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* City */}
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Grid>

              

              {/* Postal Code */}
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Country */}
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Submit Button */}
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                gap={2}
                mt={2}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#f48fb1",
                    "&:hover": { backgroundColor: "#ec6d9d" },
                    px: 4,
                  }}
                >
                  Save Address
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AddAddress;
