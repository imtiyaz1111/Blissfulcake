import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "Imtiyaz Alam",
    email: "imtiyaz@example.com",
    phone: "9876543210",
    profileImage: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle API call or form submission here
    console.log("Profile updated:", formData);
  };

  return (
    <Box
      sx={{
        p: 1,
        maxWidth: "100%",
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Edit Profile
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={3}>
            {/* Username */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Phone Number */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Profile image */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Button variant="contained" component="label" fullWidth>
                Upload Profile Image
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profileImage: e.target.files[0],
                    }))
                  }
                  required
                />
              </Button>
            </Grid>

            {/* Buttons */}
            <Grid
              item
              size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
              display="flex"
              gap={2}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => console.log("Cancel clicked")}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditProfile;
