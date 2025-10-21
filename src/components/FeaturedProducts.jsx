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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getAllProduct } from "../Api/functions/productFunctions";
import { baseURL } from "../Api/axiosIntance";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistProvider";

const FeaturedProducts = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { wishlist, addToWishlistContext, removeFromWishlistContext, isInWishlist } = useWishlist();

  useEffect(() => {
    getAllProduct(setAllProduct,setLoading);
  }, []);

  const handleWishlist = (product) => {
    const productId = product._id;
    if (isInWishlist(productId)) {
      const wishlistItem = wishlist.find((item) => item?._id === productId);
      if (!wishlistItem) return;
      removeFromWishlistContext(wishlistItem._id);
    } else {
      addToWishlistContext(productId);
    }
  };

  return (
    <Box sx={{ width: "100%", py: 5, px: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#f48fb1", mb: 1 }}>
        Featured Products: Top Picks Inside
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
        Discover our handpicked featured products - quality, style, and value!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {allProduct.slice(0, 8).map((product) => {
          const wishlisted = isInWishlist(product._id);
          return (
            <Grid key={product._id}  size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", position: "relative" }}>
                <IconButton
                  onClick={() => handleWishlist(product)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: wishlisted ? "#f48fb1" : "white",
                    color: wishlisted ? "white" : "inherit",
                    "&:hover": { bgcolor: wishlisted ? "#f48fb1" : "#f5f5f5" },
                  }}
                >
                  {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>

                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${baseURL}${product.image}`}
                    alt={product.name}
                    sx={{ objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                  />
                </Link>

                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                  <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {product.name}
                    </Typography>
                  </Link>

                  {product.ratings && (
                    <Box sx={{ mb: 1 }}>
                      <Rating value={product.ratings} precision={0.5} readOnly />
                      <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                        ({product.ratings.toFixed(1)})
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="h6" sx={{ color: "#f48fb1", fontWeight: "bold", mb: 2 }}>
                    ₹{product.weights?.[0]?.price || "N/A"}
                  </Typography>

                  <Button variant="outlined" sx={{ borderColor: "#f48fb1", color: "#f48fb1", borderRadius: "25px", px: 3, "&:hover": { bgcolor: "#f48fb1", color: "white" } }}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
          );
        })}
      </Grid>
        {/* View All Button */}
      <Box sx={{ mt: 5 }}>
        <Button
          variant="contained"
          component={Link}
          to="/shop"
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
