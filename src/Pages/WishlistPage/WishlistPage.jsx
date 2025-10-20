import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import WishlistItem from "./WishlistItem";
import { useAuth } from "../../context/AuthProvider";
import { getAllWhishlist } from "../../Api/functions/wishlistFunctions";

// Dummy wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    sku: "SRU/10345",
    details: "Rich chocolate truffle | 1kg Cake",
    price: 79.0,
    image:
      "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
  {
    id: 2,
    name: "Vanilla Floral Cake",
    sku: "SRU/29212",
    details: "Decorated Floral Vanilla Cake | 1.5kg",
    price: 99.0,
    image:
      "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
  {
    id: 3,
    name: "Red Velvet Heart Cake",
    sku: "SRU/74822",
    details: "Classic Heart-Shaped Red Velvet | 1kg",
    price: 89.0,
    image:
      "http://localhost:5000/uploads/productImg/1759549252685-soccer-cake.jpg",
  },
];

const WishlistPage = () => {
  const [wishlistData, setWishlistData] =useState([]);
  const [auth] = useAuth();
  const token = auth?.token;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(()=>{
    getAllWhishlist(setWishlistData, token);
  },[])
  console.log("wi",wishlistData);
  

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
            ({wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "Item" : "Items"} in your wishlist)
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

            {wishlistItems.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WishlistPage;
