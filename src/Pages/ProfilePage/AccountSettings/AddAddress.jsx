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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const token = auth?.token;
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on typing
  };

  // ✅ Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    } else if (!/^[0-9]{5,6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Enter a valid 5–6 digit postal code";
    }

    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

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
                  error={!!errors.fullName}
                  helperText={errors.fullName}
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
                  error={!!errors.phone}
                  helperText={errors.phone}
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
                  error={!!errors.street}
                  helperText={errors.street}
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
                  error={!!errors.state}
                  helperText={errors.state}
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
                  error={!!errors.city}
                  helperText={errors.city}
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
                  error={!!errors.postalCode}
                  helperText={errors.postalCode}
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
                  error={!!errors.country}
                  helperText={errors.country}
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
