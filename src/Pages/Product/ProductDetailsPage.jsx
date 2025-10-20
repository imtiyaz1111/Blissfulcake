import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Divider,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { getProductById } from "../../Api/functions/productFunctions";
import { useParams } from "react-router-dom";
import { baseURL } from "../../Api/axiosIntance";
import InfoTabs from "../../components/InfoTabs";
import Loading from "../../components/Loading/Loading";
import RelatedProducts from "./RelatedProducts";

const ProductDetailsPage = () => {
  const [singleProductData, setSingleProductData] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProductById(id, setSingleProductData);
  }, [id]);

  useEffect(() => {
    if (singleProductData?.weights?.length > 0) {
      setSelectedWeight(singleProductData.weights[0]);
    }
  }, [singleProductData]);

  if (!singleProductData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Loading/>
      </Box>
    );
  }

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
  };

  const calculateDiscount = (price, discountedPrice) => {
    if (discountedPrice && discountedPrice < price) {
      return Math.round(((price - discountedPrice) / price) * 100);
    }
    return 0;
  };

  return (
    <Box p={{ xs: 2, md: 5 }} bgcolor="#fafafa" minHeight="90vh">
      <Grid container spacing={4} justifyContent="center">
        {/* Left: Product Image */}
        <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              bgcolor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <img
              src={`${baseURL}${singleProductData.image}`}
              alt={singleProductData.name}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "450px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>

        {/* Right: Product Details */}
        <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }}>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              p: { xs: 2, md: 4 },
            }}
          >
            {/* Product Title */}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 1, color: "#333" }}
            >
              {singleProductData.name}
            </Typography>

            {/* Category & Flavor */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontStyle: "italic" }}
            >
              Category: {singleProductData.category} | Flavor:{" "}
              {singleProductData.flavor}
            </Typography>

            {/* Rating & Reviews */}
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Rating
                value={singleProductData.ratings || 0}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="text.secondary">
                ({singleProductData.numReviews} Reviews)
              </Typography>
            </Stack>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              mb={3}
              dangerouslySetInnerHTML={{
                __html: singleProductData.description,
              }}
            />
            <Divider sx={{ mb: 2 }} />

            {/* Price & Stock Section */}
            <Box display="flex" alignItems="center" mb={2} gap={1}>
              {selectedWeight?.discountedPrice > 0 ? (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#d32f2f",
                      fontWeight: "bold",
                    }}
                  >
                    ₹{selectedWeight.discountedPrice}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: "line-through",
                      color: "gray",
                    }}
                  >
                    ₹{selectedWeight.price}
                  </Typography>
                  <Chip
                    label={`${calculateDiscount(
                      selectedWeight.price,
                      selectedWeight.discountedPrice
                    )}% OFF`}
                    color="success"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </>
              ) : (
                <Typography variant="h5" fontWeight="bold" color="#333">
                  ₹{selectedWeight?.price}
                </Typography>
              )}
              {/* Stock Availability */}
              <Typography
                variant="body1"
                sx={{
                  ml: 3,
                  fontWeight: "bold",
                  color: singleProductData.countInStock > 0 ? "green" : "red",
                }}
              >
                {singleProductData.countInStock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </Typography>
            </Box>

            {/* Weight Options */}
            <Box mb={3}>
              <Typography fontWeight="bold" mb={1}>
                Select Weight:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                {singleProductData.weights.map((weight) => (
                  <Button
                    key={weight._id}
                    variant={
                      selectedWeight?._id === weight._id
                        ? "contained"
                        : "outlined"
                    }
                    sx={{
                      borderColor: "#f48fb1",
                      color:
                        selectedWeight?._id === weight._id
                          ? "white"
                          : "#f48fb1",
                      bgcolor:
                        selectedWeight?._id === weight._id
                          ? "#f48fb1"
                          : "transparent",
                      borderRadius: "25px",
                      "&:hover": {
                        bgcolor: "#f48fb1",
                        color: "#fff",
                      },
                    }}
                    onClick={() => handleWeightChange(weight)}
                  >
                    {weight.label}
                  </Button>
                ))}
              </Stack>

              {/* WhatsApp Contact for Custom/Bulk Orders */}
              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                sx={{
                  bgcolor: "#25D366",
                  "&:hover": { bgcolor: "#128C7E" },
                  borderRadius: "25px",
                  textTransform: "none",
                }}
                href="https://wa.me/919876543210" // replace with your WhatsApp number
                target="_blank"
              >
                Contact for Custom/Bulk Orders
              </Button>
            </Box>

            {/* Buttons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                disabled={singleProductData.countInStock === 0}
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
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                disabled={singleProductData.countInStock === 0}
                sx={{
                  borderColor: "#f48fb1",
                  color: "#f48fb1",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.2,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#f48fb1", color: "white" },
                }}
              >
                Buy Now
              </Button>

              <IconButton
                sx={{
                  border: "1px solid #f48fb1",
                  color: "#f48fb1",
                  borderRadius: "50%",
                  "&:hover": { bgcolor: "#f48fb1", color: "white" },
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <InfoTabs/>
      {/* Related Product */}
      <RelatedProducts/>
    </Box>
  );
};

export default ProductDetailsPage;
