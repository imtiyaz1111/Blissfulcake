// HeroSection.js
import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import heroImage from "../assets/herosection.png";

const HeroSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 5, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6, // more breathing space
        }}
      >
        {/* Left Content */}
        <Box sx={{ flex: { xs: 1, md: 1.2 } }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Blissful Bites
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              lineHeight: 1.2,
              mb: 2,
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" }, // bigger
            }}
          >
            Sweetness in <br /> Every Slice
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 3,
              maxWidth: "550px",
              fontSize: { xs: "1rem", md: "1.15rem" }, // slightly bigger
              lineHeight: 1.6,
            }}
          >
            Welcome to Blissful Bites, your destination for freshly baked cakes
            crafted with love and care. Whether it’s a birthday, wedding, or
            just a sweet craving, we have the perfect cake to make your moments
            truly special.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#f195b2",
                "&:hover": { bgcolor: "#f28aabff" },
                borderRadius: "8px",
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Shop Now
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#f195b2",
                color: "#f195b2",
                borderRadius: "8px",
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Order on WhatsApp
            </Button>
          </Stack>
        </Box>

        {/* Right Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={heroImage}
            alt="Chocolate Cake"
            sx={{
              width: "100%",
              maxWidth: "550px", // keeps image contained
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
