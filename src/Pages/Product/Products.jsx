import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Drawer,
  IconButton,
  Slider,
  Rating,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getAllProduct } from "../../Api/functions/productFunctions";
import { baseURL } from "../../Api/axiosIntance";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistProvider";
import { useCart } from "../../context/CartProvider";
import { toast } from "react-toastify";

const Products = () => {
  const [price, setPrice] = useState([100, 4000]);
  const [rating, setRating] = useState(null);
  const [flavours, setFlavours] = useState([]);
  const [weights, setWeights] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(6);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const [flavourOptions, setFlavourOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);

  // Wishlist context
  const { wishlist, addToWishlistContext, removeFromWishlistContext } = useWishlist();

  // Cart context
  const { cart, addToCartContext,fetchCart } = useCart();

  const isInWishlist = (productId) =>
    wishlist.some((item) => item?._id === productId || item?.productId?._id === productId);

  const isInCart = (productId) =>
    cart.some((item) => item?.product?._id === productId || item?._id === productId);

  const handleWishlist = (product) => {
    const productId = product._id;
    if (isInWishlist(productId)) {
      const wishlistItem = wishlist.find(
        (item) => item._id === productId || item?.productId?._id === productId
      );
      if (!wishlistItem) return;
      removeFromWishlistContext(wishlistItem._id);
    } else {
      addToWishlistContext(productId);
    }
  };

  const handleAddToCart = async (productId) => {
    if (isInCart(productId)) {
      toast.info("Already in cart");
      return;
    }
    await addToCartContext(productId, 1);
    await fetchCart(); // ✅ Refresh cart instantly
    toast.success("Added to cart");
  };

  useEffect(() => {
    setLoading(true);
    getAllProduct((data) => {
      setAllProduct(data);
      setLoading(false);

      // Extract unique flavours and weights
      const uniqueFlavours = [...new Set(data.map((p) => p.flavor).filter(Boolean))];
      setFlavourOptions(uniqueFlavours);

      const uniqueWeights = [
        ...new Set(data.flatMap((p) => p.weights?.map((w) => w.label) || [])),
      ];
      setWeightOptions(uniqueWeights);
    }, setLoading);
  }, []);

  const handleFlavourChange = (flavour) => {
    setFlavours((prev) =>
      prev.includes(flavour) ? prev.filter((f) => f !== flavour) : [...prev, flavour]
    );
  };

  const handleWeightChange = (weight) => {
    setWeights((prev) =>
      prev.includes(weight) ? prev.filter((w) => w !== weight) : [...prev, weight]
    );
  };

  const clearFilters = () => {
    setPrice([100, 4000]);
    setRating(null);
    setFlavours([]);
    setWeights([]);
  };

  const filteredProducts = allProduct
    .filter(
      (p) =>
        Math.min(...p.weights.map((w) => w.price)) >= price[0] &&
        Math.min(...p.weights.map((w) => w.price)) <= price[1]
    )
    .filter((p) => (rating ? p.ratings >= rating : true))
    .filter((p) => (flavours.length ? flavours.includes(p.flavor) : true))
    .filter((p) => (weights.length ? p.weights.some((w) => weights.includes(w.label)) : true))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase().trim()))
    .sort((a, b) => {
      const priceA = Math.min(...a.weights.map((w) => w.price));
      const priceB = Math.min(...b.weights.map((w) => w.price));
      if (sort === "priceLowHigh") return priceA - priceB;
      if (sort === "priceHighLow") return priceB - priceA;
      if (sort === "ratingHighLow") return b.ratings - a.ratings;
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Loading />
      </Box>
    );
  }

  return (
    <Box p={{ xs: 1, sm: 2, md: 3 }} bgcolor="#f9f9f9" minHeight="500px">
      <Box display="flex" gap={2}>
        {/* Sidebar Filters (Desktop) */}
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            width: "280px",
            flexShrink: 0,
            position: "sticky",
            top: "180px",
            height: "500px",
          }}
        >
          <Box
            p={2}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 6,
              height: "100%",
              overflowY: "auto",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.08)",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Filters
              </Typography>
              <Button onClick={clearFilters} size="small" sx={{ color: "purple" }}>
                Clear All
              </Button>
            </Box>

            {/* Price Slider */}
            <Box mb={2}>
              <Typography fontWeight="bold" mb={1}>
                Price
              </Typography>
              <Slider
                value={price}
                onChange={(e, newVal) => setPrice(newVal)}
                valueLabelDisplay="auto"
                min={50}
                max={5000}
                sx={{ color: "purple" }}
              />
              <Box display="flex" justifyContent="space-between">
                <Typography>₹{price[0]}</Typography>
                <Typography>₹{price[1]}</Typography>
              </Box>
            </Box>

            {/* Rating */}
            <Box mb={2}>
              <Typography fontWeight="bold" mb={1}>
                Rating
              </Typography>
              <Rating value={rating} onChange={(e, newVal) => setRating(newVal)} />
            </Box>

            {/* Flavours */}
            {flavourOptions.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Flavours</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {flavourOptions.map((f) => (
                      <FormControlLabel
                        key={f}
                        control={<Checkbox checked={flavours.includes(f)} onChange={() => handleFlavourChange(f)} />}
                        label={f}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Weights */}
            {weightOptions.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Weights</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {weightOptions.map((w) => (
                      <FormControlLabel
                        key={w}
                        control={<Checkbox checked={weights.includes(w)} onChange={() => handleWeightChange(w)} />}
                        label={w}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        </Box>

        {/* Products Grid */}
        <Box flex={1}>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} justifyContent="space-between" alignItems="center" mb={2}>
            <Typography sx={{ mb: { xs: 1, sm: 0 } }}>
              <b>Show:</b> All Products <span style={{ color: "gray" }}>({allProduct.length} items)</span>
            </Typography>

            <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: { xs: "100%", sm: 200, md: 250 } }}
              />
              <Select value={sort} onChange={(e) => setSort(e.target.value)} size="small" sx={{ minWidth: 180 }}>
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                <MenuItem value="ratingHighLow">Rating: High to Low</MenuItem>
              </Select>
              <IconButton sx={{ display: { xs: "flex", lg: "none" } }} onClick={() => setMobileOpen(true)}>
                <FilterList />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => {
                const lowestPrice = Math.min(...product.weights.map((w) => w.price));
                const discountPrice =
                  product.weights[0].discountedPrice > 0 ? product.weights[0].discountedPrice : null;
                const inCart = isInCart(product._id);
                const wishlisted = isInWishlist(product._id);

                return (
                  <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} sx={{ flex: "1 1 300px", maxWidth: "400px" }}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        position: "relative",
                      }}
                    >
                      {/* Wishlist Button */}
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          bgcolor: wishlisted ? "#f48fb1" : "white",
                          color: wishlisted ? "white" : "inherit",
                          "&:hover": { bgcolor: wishlisted ? "#f48fb1" : "#f5f5f5" },
                        }}
                        onClick={() => handleWishlist(product)}
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

                        <Box sx={{ mb: 1 }}>
                          <Rating value={product.ratings} precision={0.5} readOnly />
                          <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                            ({product.ratings.toFixed(1)})
                          </Typography>
                        </Box>

                        <Typography variant="h6" sx={{ color: "#f48fb1", fontWeight: "bold", mb: 2 }}>
                          {discountPrice ? (
                            <>
                              <span style={{ textDecoration: "line-through", marginRight: "8px", color: "#999" }}>
                                ₹{lowestPrice}
                              </span>
                              ₹{discountPrice}
                            </>
                          ) : (
                            <>₹{lowestPrice}</>
                          )}
                        </Typography>

                        <Button
                          variant={inCart ? "contained" : "outlined"}
                          onClick={() => handleAddToCart(product._id)}
                          sx={{
                            borderColor: "#f48fb1",
                            color: inCart ? "#fff" : "#f48fb1",
                            bgcolor: inCart ? "#f48fb1" : "transparent",
                            borderRadius: "25px",
                            px: 3,
                            "&:hover": { bgcolor: "#f48fb1", color: "#fff" },
                          }}
                        >
                          {inCart ? "In Cart" : "Add to Cart"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Typography variant="body1" p={2}>
                No products found.
              </Typography>
            )}
          </Grid>

          {visibleCount < filteredProducts.length && (
            <Box textAlign="center" mt={4}>
              <Button
                variant="outlined"
                onClick={() => setVisibleCount((prev) => prev + 3)}
                sx={{
                  bgcolor: "#f48fb1",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.2,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#d0678b" },
                }}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Mobile Drawer Filters */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box p={2} sx={{ width: "80vw", maxWidth: 300 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Filters
          </Typography>
          <Button onClick={clearFilters} size="small" sx={{ color: "purple", mb: 2 }}>
            Clear All
          </Button>

          {/* Price Slider */}
          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Price
            </Typography>
            <Slider value={price} onChange={(e, newVal) => setPrice(newVal)} valueLabelDisplay="auto" min={50} max={5000} sx={{ color: "purple" }} />
            <Box display="flex" justifyContent="space-between">
              <Typography>₹{price[0]}</Typography>
              <Typography>₹{price[1]}</Typography>
            </Box>
          </Box>

          {/* Rating */}
          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Rating
            </Typography>
            <Rating value={rating} onChange={(e, newVal) => setRating(newVal)} />
          </Box>

          {/* Flavours */}
          {flavourOptions.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Flavours</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {flavourOptions.map((f) => (
                    <FormControlLabel key={f} control={<Checkbox checked={flavours.includes(f)} onChange={() => handleFlavourChange(f)} />} label={f} />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Weights */}
          {weightOptions.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Weights</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {weightOptions.map((w) => (
                    <FormControlLabel key={w} control={<Checkbox checked={weights.includes(w)} onChange={() => handleWeightChange(w)} />} label={w} />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Products;
