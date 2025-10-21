import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import WishlistItem from "./WishlistItem";
import { useWishlist } from "../../context/WishlistProvider";

const WishlistPage = () => {
  const { wishlist, removeFromWishlistContext, loading } = useWishlist();
  console.log("wishlist",wishlist.products);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const pageBackgroundColor = "#fcf0f5";

  return (
    <Box
      sx={{
        backgroundColor: pageBackgroundColor,
        minHeight: "100vh",
        py: isMobile ? 2 : 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            backgroundImage: "linear-gradient(to right, #f77f9e, #fdadbb)",
            p: isMobile ? 2 : 3,
            mb: isMobile ? 3 : 4,
            borderRadius: theme.shape.borderRadius,
            color: "white",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
            Your Wishlist
          </Typography>
          <Typography variant="subtitle1">
            ({wishlist?.length || 0}{" "}
            {wishlist?.length === 1 ? "Item" : "Items"} in your wishlist)
          </Typography>
        </Box>

        {/* Wishlist Content */}
        <Grid container spacing={isTablet ? 2 : 4}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              sx={{ mb: 3, textAlign: isMobile ? "center" : "left" }}
            >
              Items You Love
            </Typography>

            {/* ✅ Conditional Rendering */}
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 5,
                }}
              >
                <CircularProgress color="secondary" />
              </Box>
            ) : wishlist.length === 0 ? (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center", py: 3 }}
              >
                No items in your wishlist yet.
              </Typography>
            ) : (
              wishlist.map((item) => (
                <WishlistItem
                  key={item._id}
                  item={item}
                  removeHandler={() => removeFromWishlistContext(item._id)}
                />
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WishlistPage;
