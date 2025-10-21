import React from "react";
import { Box, Typography, Button, Card, styled, useTheme } from "@mui/material";
import { useWishlist } from "../../context/WishlistProvider"; // adjust the import path if needed
import { baseURL } from "../../Api/axiosIntance";

// Styled Card
const WishlistItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
    padding: theme.spacing(2),
  },
}));

const WishlistItem = ({ item }) => {
  const theme = useTheme();
  const { removeFromWishlistContext } = useWishlist();

  // ✅ Remove handler
  const removeHandler = () => {
    if (item._id) {
      removeFromWishlistContext(item._id);
    } else {
      console.warn("No wishlist ID found for this item");
    }
  };

  return (
    <WishlistItemCard>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {/* Product Image */}
        <img
          src={`${baseURL}${item.image}`}
          alt={`${item.name} product image`}
          style={{
            width: 90,
            height: 90,
            borderRadius: theme.shape.borderRadius,
            marginRight: 16,
            objectFit: "cover",
          }}
        />

        {/* Product Info */}
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 180,
            mb: { xs: 1.5, sm: 0 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            SKU: P-{item._id}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
            dangerouslySetInnerHTML={{
              __html: item.description,
            }}
          />
        </Box>

        {/* Price + Buttons */}
        <Box
          sx={{
            mt: { xs: 1.5, sm: 0 },
            textAlign: { xs: "center", sm: "right" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              color: "#d81b60",
              mb: 1,
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            Price: ₹{item.weights[0].price?.toFixed(2) || "0.00"}
          </Typography>

          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundImage: "linear-gradient(to right, #fdadbb, #f77f9e)",
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(to right, #f77f9e, #fdadbb)",
                },
              }}
              onClick={() => console.log("Added to cart:", item.name)}
            >
              Add to Cart
            </Button>

            {/* ✅ Remove Button with removeHandler */}
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              onClick={removeHandler}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Box>
    </WishlistItemCard>
  );
};

export default WishlistItem;
