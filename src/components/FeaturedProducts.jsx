// FeaturedProducts.js
import React, { useEffect, useState } from "react";
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
import { getAllProduct } from "../Api/functions/productFunctions";
import { baseURL } from "../Api/axiosIntance";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllProduct(setAllProduct, setLoading);
  }, []);
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
        {allProduct.slice(0, 8).map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
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
                image={`${baseURL}${product.image}`}
                alt={product.name}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              />

              <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {product.name}
                </Typography>

                {/* Rating */}
                {product.rating && (
                  <Box sx={{ mb: 1 }}>
                    <Rating value={product.ratings} precision={0.5} readOnly />
                    <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                      ({product.ratings.toFixed(1)})
                    </Typography>
                  </Box>
                )}

                {/* Price */}
                <Typography
                  variant="h6"
                  sx={{ color: "#f48fb1", fontWeight: "bold", mb: 2 }}
                >
                  ₹{product.weights[0].price}
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
          component={Link}
          to="/shope"
          sx={{
            bgcolor: "#f48fb1",
            color: "white",
            borderRadius: "25px",
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            "&:hover": { bgcolor: "#d0678b" },
          }}
        >
          View All
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
