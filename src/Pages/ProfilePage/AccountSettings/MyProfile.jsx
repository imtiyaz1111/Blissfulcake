import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import { getProfile } from "../../../Api/functions/profileFunctions";
import { useAuth } from "../../../context/AuthProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { deleteAddress } from "../../../Api/functions/addressFunctions";
import Loading from "../../../components/Loading/Loading";
const MyProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const token = auth?.token;

 // ✅ Fetch profile data
  const fetchProfile = async () => {
    await getProfile(setProfileData, token, setLoading);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const handleDeleteAddress = async (id) => {
    // Implement delete address functionality here
   await deleteAddress(id,token,setLoading)
   await fetchProfile()
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Loading/>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Account Settings
      </Typography>

      <Card
        elevation={3}
        sx={{ maxWidth: "100%", mx: "auto", borderRadius: 3 }}
      >
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* User Info */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sm={9}>
              <Typography variant="h6" fontWeight="bold">
                {profileData.username || "-"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Email: {profileData.email || "-"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Phone: {profileData.number || "-"}
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  LinkComponent={Link}
                  to={"/profile/settings/edit"}
                  startIcon={<EditIcon />}
                  variant="contained"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #f77f9e, #fdadbb)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Edit Profile
                </Button>

                <Button
                  LinkComponent={Link}
                  to={"/update-password"}
                  startIcon={<LockResetIcon />}
                  variant="outlined"
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Change Password
                </Button>
              </Box>
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Address Information
              </Typography>
              {profileData.address && profileData.address.length > 0 ? (
                profileData.address.map((addr) => (
                  <Paper
                    key={addr._id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      position: "relative", // required for absolute positioning
                    }}
                  >
                    {/* Delete Icon (top-right corner) */}
                    <IconButton
                      color="error"
                      size="small"
                      sx={{ position: "absolute", top: 8, right: 8 }}
                      onClick={() => handleDeleteAddress(addr._id)} // 🔹 You can define this function
                    >
                      <DeleteIcon />
                    </IconButton>

                    <Typography>
                      <strong>{addr.fullName}</strong>
                    </Typography>
                    <Typography>Phone: {addr.phone}</Typography>
                    <Typography>
                      {addr.street}, {addr.city}, {addr.state},{" "}
                      {addr.postalCode}, {addr.country}
                    </Typography>
                    {addr.isDefault && (
                      <Typography color="primary" fontWeight="bold">
                        Default Address
                      </Typography>
                    )}
                  </Paper>
                ))
              ) : (
                <Typography>No addresses found.</Typography>
              )}
              {/* Action Buttons */}
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  LinkComponent={Link}
                  to={"/profile/settings/add-address"}
                  startIcon={<EditIcon />}
                  variant="contained"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #f77f9e, #fdadbb)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Add Address
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfile;
