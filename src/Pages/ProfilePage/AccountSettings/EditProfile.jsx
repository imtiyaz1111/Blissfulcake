import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getProfile,
  updateProfile,
} from "../../../Api/functions/profileFunctions"; // ✅ adjust path as per your project
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../Api/axiosIntance";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    profileImage: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const token = auth?.token;
  const navigate = useNavigate();

  // ✅ Fetch profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProfile(setFormData, token, setLoading);
      } catch (error) {
        toast.error("Failed to fetch profile data");
      }
    };
    fetchData();
  }, [token]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("number", formData.number);
    if (formData.profileImage instanceof File) {
      data.append("profileImage", formData.profileImage);
    }

    await updateProfile(data, token, navigate);
  };

  return (
    <Box sx={{ p: 1, maxWidth: "100%" }}>
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
                  name="number"
                  type="tel"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Profile Image Upload */}
              <Grid
                size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                textAlign="center"
              >
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{
                    backgroundColor: "#f48fb1",
                    "&:hover": { backgroundColor: "#ec6d9d" },
                  }}
                >
                  Upload Profile Image
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>

                {/* Show image preview */}
                {(preview || formData.profileImage) && (
                  <Box sx={{ mt: 3 }}>
                    <Avatar
                      src={
                        preview ||
                        `${baseURL}${formData.profileImage}` ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt="Profile Preview"
                      sx={{
                        width: 120,
                        height: 120,
                        mx: "auto",
                        border: "3px solid #f48fb1",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "gray", fontStyle: "italic" }}
                    >
                      Profile image preview
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Buttons */}
              <Grid
                item
                size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                display="flex"
                gap={2}
                justifyContent="center"
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#f48fb1",
                    "&:hover": { backgroundColor: "#ec6d9d" },
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default EditProfile;
