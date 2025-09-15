import React from "react";
import CommonBanner from "../components/CommonBanner";
import {
  Box,
  Typography,
  Container,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import bakery1 from "../assets/bakery-1.jpg";
import bakery2 from "../assets/bakery-2.jpg";
import bakery3 from "../assets/bakery-3.jpg";

const Aboutus = () => {
  return (
    <>
      <CommonBanner title="About Us" />

      {/* About Section */}
      <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: "#fff" }}>
        <Container maxWidth="lg">
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight={700}
            align="center"
            gutterBottom
            sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
          >
            Our Bakery Approach
          </Typography>

          <Divider
            sx={{
              width: 60,
              height: 2,
              bgcolor: "grey.500",
              mx: "auto",
              mb: 3,
            }}
          />

          {/* Italic Subtext */}
          <Typography
            variant="h6"
            fontStyle="italic"
            color="text.secondary"
            align="center"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 3,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            At Blissful Bites, we believe that every celebration deserves a touch
            of sweetness. What started as a passion for baking has now grown into
            a delightful journey of crafting cakes that not only look stunning
            but taste unforgettable.
          </Typography>

          {/* Paragraphs */}
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: "850px", mx: "auto", mb: 3 }}
          >
            Our cakes are more than just desserts – they are expressions of love,
            joy, and togetherness. Whether it’s a birthday, wedding, anniversary,
            or a simple “just because” moment, we’re here to make it extra
            special with our freshly baked creations.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: "850px", mx: "auto", mb: 6 }}
          >
            We pride ourselves on using the finest ingredients, blending
            traditional recipes with modern flavors, and adding a pinch of
            creativity to every bite. From classic favorites to custom-designed
            masterpieces, each cake is baked with care, crafted with artistry,
            and delivered with happiness.
          </Typography>

          {/* Images */}
          <Grid container spacing={3} justifyContent="center">
            {[bakery1, bakery2, bakery3].map((img, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box
                  component="img"
                  src={img}
                  alt={`bakery-${i}`}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    objectFit: "cover",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Real Taste Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "300px", md: "500px" },
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3.5rem" },
              mb: 2,
            }}
          >
            Real Taste
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.9rem", md: "1.25rem" },
              fontStyle: "italic",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            A light, sour wheat dough with roasted walnuts and freshly picked
            rosemary, thyme, poppy seeds, parsley and sage.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: "#fff" }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 6 }}
            alignItems="flex-start"
          >
            {/* Left Title */}
            <Box flex={1}>
              <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  position: "relative",
                  display: "inline-block",
                }}
              >
                Our Mission
              </Typography>
              <Divider
                sx={{
                  width: 40,
                  height: 2,
                  bgcolor: "grey.500",
                  mt: 1,
                }}
              />
            </Box>

            {/* Right Content */}
            <Box flex={3}>
              <Typography
                variant="body1"
                fontStyle="italic"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                At Blissful Bites, our mission is simple – to spread happiness
                with every bite. We believe that cakes are more than just
                desserts; they are memories, celebrations, and moments of joy.
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                With a passion for baking and a commitment to quality, we craft
                each creation with love, using only the finest ingredients. From
                birthdays to weddings, or simply to make an ordinary day special,
                our cakes are designed to delight hearts and taste buds alike.
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Whether you’re looking for{" "}
                <strong>custom cakes, birthday cakes, wedding cakes</strong>, or{" "}
                <strong>European delicacies</strong>, Blissful Bites is here to
                make your sweet moments unforgettable.
              </Typography>

              {/* Tags */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                fontStyle="italic"
              >
                <Typography variant="subtitle1">Custom cakes</Typography>
                <Typography variant="subtitle1">Birthday cakes</Typography>
                <Typography variant="subtitle1">Wedding cakes</Typography>
                <Typography variant="subtitle1">European delicacies</Typography>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Aboutus;
