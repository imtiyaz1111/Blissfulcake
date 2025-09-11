// FeaturesSection.js
import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import cakeImage from "../assets/cake.png"; // replace with your cake image

const features = [
  {
    icon: <PaymentIcon sx={{ fontSize: 30, color: "#4caf50" }} />,
    title: "Fast and Easy Payments",
    desc: "Safest payment",
  },
  {
    icon: <WorkspacePremiumIcon sx={{ fontSize: 30, color: "#ff9800" }} />,
    title: "Premium Quality & Pocket-Friendly",
    desc: "Luxury you can trust",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 30, color: "#2196f3" }} />,
    title: "Efficient Delivery",
    desc: "Seamless and reliable delivery",
  },
];

const FeaturesSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f9f6fb", // light purple strip
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 10 },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Side - Feature Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    height: "100%",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Icon inside circle */}
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    {feature.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#8e24aa" }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side - Cake Image */}
        <Grid item xs={12} md={4} textAlign="center">
          <Box
            component="img"
            src={cakeImage}
            alt="Cake"
            sx={{
              width: "100%",
              maxWidth: "320px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
