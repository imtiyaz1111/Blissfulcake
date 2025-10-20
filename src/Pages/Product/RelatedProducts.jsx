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
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../Api/axiosIntance";
import { getRelatedProducts } from "../../Api/functions/productFunctions";

const RelatedProducts = () => {
  const [relatedProductData, setRelatedProductData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getRelatedProducts(id, setRelatedProductData);
  }, [id]);

  // ✅ If no related products, return nothing
  if (!relatedProductData || relatedProductData.length === 0) {
    return null;
  }

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

          return (
            <Card
              key={product._id}
              component={Link}
              to={`/product/${product._id}`}
              sx={{
                minWidth: 200,
                flex: "0 0 auto",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {/* Product Image */}
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

                {/* Add to Cart & Wishlist */}
                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      px: 2,
                      borderColor: "#f48fb1",
                      color: "#f48fb1",
                      "&:hover": { bgcolor: "#f48fb1", color: "#fff" },
                    }}
                  >
                    Add to Cart
                  </Button>

                  <IconButton
                    size="small"
                    sx={{
                      border: "1px solid #f48fb1",
                      color: "#f48fb1",
                      "&:hover": { bgcolor: "#f48fb1", color: "#fff" },
                    }}
                  >
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
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
