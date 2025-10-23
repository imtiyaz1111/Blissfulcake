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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import { getProfile } from "../../../Api/functions/profileFunctions";
import { useAuth } from "../../../context/AuthProvider";

// Dummy function to simulate fetching user data
const fetchUserData = () => {
  return {
    username: "Sajda Parween",
    email: "sajda@example.com",
    phone: "9876543210",
    address: "123, Street Name, City, Country",
    profileImage: "", // you can put an image URL here
  };
};

const MyProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    getProfile(setProfileData, token, setLoading);
  }, []);

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
            <Grid item xs={12} sm={9}>
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
                  startIcon={<EditIcon />}
                  variant="contained"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #f77f9e, #fdadbb)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  onClick={() => alert("Redirect to edit profile page")}
                >
                  Edit Profile
                </Button>

                <Button
                  startIcon={<LockResetIcon />}
                  variant="outlined"
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                  onClick={() => alert("Redirect to change password page")}
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
                    sx={{ p: 2, mb: 2, borderRadius: 2 }}
                  >
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
                  startIcon={<EditIcon />}
                  variant="contained"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #f77f9e, #fdadbb)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  onClick={() => alert("Redirect to edit profile page")}
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
