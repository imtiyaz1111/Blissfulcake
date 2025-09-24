// FeaturesSection.js
import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import cakeImage from "../assets/cake.png";
import bgImage from "../assets/banner3.jpg";

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
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 10 },
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: { xs: "scroll", md: "fixed" }, // mobile friendly
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        {/* Left Side - Features */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}
                sx={{height:"200px", width: "30%",
                  "@media (max-width:576px)": {
                    width: "100%",
                  },
                }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: "16px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                    height: "100%",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(6px)",
                    bgcolor: "rgba(255,255,255,0.85)",
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                      bgcolor: "#fff",
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#8e24aa",
                      fontSize: { xs: "1rem", md: "1.1rem" },
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.85rem", md: "0.95rem" },
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side - Cake Image */}
        <Grid
          item
          xs={12}
          md={4}
          textAlign="center"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            component="img"
            src={cakeImage}
            alt="Cake"
            sx={{
              display: { xs: "none", sm: "none", md: "none", 
                "@media (min-width:1425px)": {
                display: "block",
              },
              },
              width: { xs: "70%", sm: "60%", md: "100%" },
              maxWidth: "320px",
              height: "auto",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
