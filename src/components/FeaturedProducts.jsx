// FeaturedProducts.js
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Example product data (8 items)
const products = [
  {
    id: 1,
    name: "Photo Cake",
    price: 900,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F4069%2FPhoto-Cake.jpeg&w=640&q=75",
  },
  {
    id: 2,
    name: "Dad’s Favourite Cake (454)",
    price: 1425,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F6046%2FDad%E2%80%99s-Favourite-Cake.jpg&w=640&q=75",
  },
  {
    id: 3,
    name: "Lavender Love Birds Cake (444)",
    price: 3000,
    rating: 5,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F6061%2FLavender-Love-Birds-Cake.jpg&w=640&q=75",
  },
  {
    id: 4,
    name: "Red Velvet Cake",
    price: 425,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F5765%2FWhatsApp-Image-2025-05-28-at-12.40.38-PM.jpeg&w=640&q=75",
  },
  {
    id: 5,
    name: "Chocolate Truffle Cake",
    price: 650,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F3154%2FPool-Party.png&w=640&q=75",
  },
  {
    id: 6,
    name: "Butterscotch Delight Cake",
    price: 700,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F3144%2FTwinkle-Toes-Cake.png&w=640&q=75",
  },
  {
    id: 7,
    name: "Pineapple Cream Cake",
    price: 550,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F6065%2FLayers-of-Love-Cake.jpg&w=640&q=75",
  },
  {
    id: 8,
    name: "Black Forest Cake",
    price: 800,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F6065%2FLayers-of-Love-Cake.jpg&w=640&q=75",
  },
];

const FeaturedProducts = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 5, md: 8 },
        px: { xs: 2, sm: 4, md: 8 },
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#f48fb1",
          mb: 1,
          fontSize: { xs: "1.8rem", md: "2.2rem" },
        }}
      >
        Featured Products: Top Picks Inside
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 5,
          fontSize: { xs: "0.9rem", md: "1rem" },
        }}
      >
        Discover our handpicked featured products - quality, style, and value!
      </Typography>

      {/* Product Grid */}
      <Grid
        container
        spacing={3}
        justifyContent="center" // center align cards
        sx={{ maxWidth: "1300px", margin: "0 auto" }} // keep content centered
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%", // equal height for all
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
                position: "relative",
              }}
            >
              {/* Wishlist Button */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>

              {/* Product Image */}
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              />

              <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                {product.rating && (
                  <Box sx={{ mb: 1 }}>
                    <Rating value={product.rating} precision={0.5} readOnly />
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ ml: 1 }}
                    >
                      ({product.rating.toFixed(1)})
                    </Typography>
                  </Box>
                )}

                {/* Price */}
                <Typography
                  variant="h6"
                  sx={{ color: "#f48fb1", fontWeight: "bold", mb: 2 }}
                >
                  ₹{product.price}
                </Typography>

                {/* Add to Cart */}
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#f48fb1",
                    color: "#f48fb1",
                    borderRadius: "25px",
                    px: 3,
                    "&:hover": { bgcolor: "#f48fb1", color: "white" },
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View All Button */}
      <Box sx={{ mt: 5 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#f48fb1",
            color: "white",
            borderRadius: "25px",
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            "&:hover": { bgcolor: "#d81b60" },
          }}
        >
          View All
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
