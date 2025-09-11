// Footer.js
import React from "react";
import { Box, Typography, Grid, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#d0678b",
        color: "rgba(255,255,255,0.8)",
        pt: 6,
        pb: 3,
        px: { xs: 3, sm: 6, md: 12 },
      }}
    >
      {/* Top Section */}
      <Grid container spacing={4} justifyContent="space-between">
        {/* About */}
        <Grid item xs={12} md={3}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Cakecious is a WordPress theme for Bakery and related businesses.
          </Typography>

          {/* Social Icons */}
          <Box>
            <IconButton
              sx={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                mr: 1,
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                mr: 1,
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                mr: 1,
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <GoogleIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "white" }}
          >
            Quick links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#" color="inherit" underline="hover">
              Your Account
            </Link>
            <Link href="#" color="inherit" underline="hover">
              View Order
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Terms & Conditions
            </Link>
          </Box>
        </Grid>

        {/* Work Times */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "white" }}
          >
            Work Times
          </Typography>
          <Typography>Mon. - Thu.: 8 am - 8 pm</Typography>
          <Typography>Fri.: 8 am - 8 pm</Typography>
          <Typography>Sat.: 9 am - 4 pm</Typography>
          <Typography>Sun.: Closed</Typography>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "white" }}
          >
            Contact Info
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", mb: 1 }}>
            (1800) 574 9687
          </Typography>
          <Typography>Cakecious Store</Typography>
          <Typography>256, Baker Street, New York, 5245</Typography>
          <Typography>cakeciousdemo@email.com</Typography>
        </Grid>
      </Grid>

      {/* Divider */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          mt: 5,
          pt: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Cakecious Demo 1 © 2025 All Rights Reserved. | Developed by Imtiyaz
        
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
