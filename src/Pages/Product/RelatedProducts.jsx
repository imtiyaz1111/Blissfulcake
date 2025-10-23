import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../Api/axiosIntance";
import { getRelatedProducts } from "../../Api/functions/productFunctions";
import { useWishlist } from "../../context/WishlistProvider";
import { useCart } from "../../context/CartProvider";
import { toast } from "react-toastify";

const RelatedProducts = () => {
  const [relatedProductData, setRelatedProductData] = useState([]);
  const { id } = useParams();

  const {
    wishlist,
    addToWishlistContext,
    removeFromWishlistContext,
    fetchWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    cart,
    addToCartContext,
    removeFromCartContext,
    fetchCart,
    isInCart,
  } = useCart();

  // ✅ Fetch related products when product ID changes
  useEffect(() => {
    getRelatedProducts(id, setRelatedProductData);
  }, [id]);

  // ✅ If no related products, return nothing
  if (!relatedProductData || relatedProductData.length === 0) {
    return null;
  }

  // ❤️ Handle Wishlist Toggle (Instant refresh after update)
  const handleWishlist = async (product) => {
    const productId = product._id;
    if (isInWishlist(productId)) {
      const wishlistItem = wishlist.find(
        (item) => item?.productId?._id === productId
      );
      if (!wishlistItem) return;
      await removeFromWishlistContext(wishlistItem._id);
      await fetchWishlist(); // ✅ Refresh wishlist instantly
      toast.info("Removed from wishlist");
    } else {
      await addToWishlistContext(productId);
      await fetchWishlist(); // ✅ Refresh wishlist instantly
      toast.success("Added to wishlist");
    }
  };

  // 🛒 Handle Add to Cart (Instant refresh after update)
  const handleAddToCart = async (productId) => {
    if (isInCart(productId)) {
      toast.info("Already in cart");
      return;
    }
    await addToCartContext(productId, 1);
    await fetchCart(); // ✅ Refresh cart instantly
    toast.success("Added to cart");
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Related Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {relatedProductData.map((product) => {
          const firstWeight = product.weights && product.weights[0];
          const price = firstWeight?.price || 0;
          const discountedPrice =
            firstWeight?.discountedPrice && firstWeight.discountedPrice > 0
              ? firstWeight.discountedPrice
              : null;
          const weightLabel = firstWeight?.label || "";

          const wishlisted = isInWishlist(product._id);
          const inCart = isInCart(product._id);

          return (
            <Card
              key={product._id}
              sx={{
                minWidth: 200,
                flex: "0 0 auto",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
                position: "relative",
              }}
            >
              {/* ❤️ Wishlist Button */}
              <IconButton
                size="small"
                onClick={() => handleWishlist(product)}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  bgcolor: wishlisted ? "#f48fb1" : "white",
                  color: wishlisted ? "white" : "#f48fb1",
                  border: "1px solid #f48fb1",
                  "&:hover": { bgcolor: "#f48fb1", color: "#fff" },
                }}
              >
                {wishlisted ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>

              {/* Product Image */}
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={`${baseURL}${product.image}`}
                  alt={product.name}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                />
              </Link>

              <CardContent>
                {/* Product Name */}
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1 }}
                  noWrap
                >
                  {product.name}
                </Typography>

                {/* Weight / Flavor */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  {product.flavor} {weightLabel && `• ${weightLabel}`}
                </Typography>

                {/* Rating */}
                <Stack direction="row" alignItems="center" spacing={0.5} mb={1}>
                  <Rating
                    value={product.ratings || 0}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({product.numReviews})
                  </Typography>
                </Stack>

                {/* Price */}
                <Typography variant="body1" fontWeight="bold" color="#d32f2f">
                  {discountedPrice ? (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#999",
                          marginRight: 6,
                        }}
                      >
                        ₹{price}
                      </span>
                      ₹{discountedPrice}
                    </>
                  ) : (
                    <>₹{price}</>
                  )}
                </Typography>

                {/* 🛒 Add to Cart Button */}
                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    variant={inCart ? "contained" : "outlined"}
                    size="small"
                    onClick={() => handleAddToCart(product._id)}
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      px: 2,
                      borderColor: "#f48fb1",
                      color: inCart ? "#fff" : "#f48fb1",
                      bgcolor: inCart ? "#f48fb1" : "transparent",
                      "&:hover": { bgcolor: "#f48fb1", color: "#fff" },
                    }}
                  >
                    {inCart ? "In Cart" : "Add to Cart"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default RelatedProducts;
