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
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../Api/axiosIntance";
import Loading from "../../components/Loading/Loading";
import { getAllProductByCategory } from "../../Api/functions/productFunctions";

const ProductByCategory = () => {
  const [price, setPrice] = useState([100, 4000]);
  const [rating, setRating] = useState(null);
  const [flavours, setFlavours] = useState([]);
  const [weights, setWeights] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(6);
  const [allProductByCategory, setAllProductByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [flavourOptions, setFlavourOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);

  const { category } = useParams();

  // Fetch products by category
  useEffect(() => {
    if (!category) return;
    setLoading(true);
    getAllProductByCategory(setAllProductByCategory, category, setLoading);
  }, [category]);

  // Set unique flavours and weights after fetching products
  useEffect(() => {
    if (!allProductByCategory || allProductByCategory.length === 0) {
      setFlavourOptions([]);
      setWeightOptions([]);
      return;
    }

    const uniqueFlavours = [
      ...new Set(
        allProductByCategory.map((p) => p.flavor || p.flavour).filter(Boolean)
      ),
    ];
    setFlavourOptions(uniqueFlavours);

    const uniqueWeights = [
      ...new Set(
        allProductByCategory.flatMap((p) =>
          (p.weights || []).map((w) => w.label).filter(Boolean)
        )
      ),
    ];
    setWeightOptions(uniqueWeights);
  }, [allProductByCategory]);

  const handleFlavourChange = (flavour) => {
    setFlavours((prev) =>
      prev.includes(flavour)
        ? prev.filter((f) => f !== flavour)
        : [...prev, flavour]
    );
  };

  const handleWeightChange = (weight) => {
    setWeights((prev) =>
      prev.includes(weight)
        ? prev.filter((w) => w !== weight)
        : [...prev, weight]
    );
  };

  const clearFilters = () => {
    setPrice([100, 4000]);
    setRating(null);
    setFlavours([]);
    setWeights([]);
  };

  const filteredProducts = (allProductByCategory || [])
    .filter((p) => {
      const priceArr = (p.weights || []).map((w) => w.price || 0);
      const lowestPrice = priceArr.length > 0 ? Math.min(...priceArr) : 0;
      return lowestPrice >= price[0] && lowestPrice <= price[1];
    })
    .filter((p) => (rating ? (p.ratings || 0) >= rating : true))
    .filter((p) => {
      const productFlavour = p.flavor || p.flavour;
      return flavours.length ? flavours.includes(productFlavour) : true;
    })
    .filter((p) =>
      weights.length
        ? (p.weights || []).some((w) => weights.includes(w.label))
        : true
    )
    .filter((p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase().trim())
    )
    .sort((a, b) => {
      const priceArrA = (a.weights || []).map((w) => w.price || 0);
      const priceArrB = (b.weights || []).map((w) => w.price || 0);
      const priceA = priceArrA.length > 0 ? Math.min(...priceArrA) : 0;
      const priceB = priceArrB.length > 0 ? Math.min(...priceArrB) : 0;

      if (sort === "priceLowHigh") return priceA - priceB;
      if (sort === "priceHighLow") return priceB - priceA;
      if (sort === "ratingHighLow") return (b.ratings || 0) - (a.ratings || 0);
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
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
            position: "sticky", // ✅ sticky applied
            top: "180px",
            height: "500px",
          }}
        >
          <Box
            p={2}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 6,
              position: "sticky",
              top: 80,
              height: "100%",
              overflowY: "auto",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Filters
              </Typography>
              <Button
                onClick={clearFilters}
                size="small"
                sx={{ color: "purple" }}
              >
                Clear All
              </Button>
            </Box>

            {/* Price Filter */}
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
              <Rating
                value={rating}
                onChange={(e, newVal) => setRating(newVal)}
              />
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
                        control={
                          <Checkbox
                            checked={flavours.includes(f)}
                            onChange={() => handleFlavourChange(f)}
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={weights.includes(w)}
                            onChange={() => handleWeightChange(w)}
                          />
                        }
                        label={w}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        </Box>

        {/* Product Section */}
        <Box flex={1}>
          {/* Top Controls */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            {/* Left: Category info */}
            <Typography sx={{ mb: { xs: 1, sm: 0 } }}>
              <b>Show:</b> {category}{" "}
              <span style={{ color: "gray" }}>
                ({allProductByCategory.length} items)
              </span>
            </Typography>

            {/* Right: Search + Sort */}
            <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: { xs: "100%", sm: 200, md: 250 } }}
              />

              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                size="small"
                sx={{ minWidth: 180 }}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                <MenuItem value="ratingHighLow">Rating: High to Low</MenuItem>
              </Select>

              {/* Mobile Filter Icon */}
              <IconButton
                sx={{ display: { xs: "flex", lg: "none" } }}
                onClick={() => setMobileOpen(true)}
              >
                <FilterListIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Product Grid */}
          <Grid container spacing={4} justifyContent="center">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => {
                const priceArr = (product.weights || []).map(
                  (w) => w.price || 0
                );
                const lowestPrice =
                  priceArr.length > 0 ? Math.min(...priceArr) : 0;
                const discountPrice =
                  product.weights &&
                  product.weights.length > 0 &&
                  product.weights[0]?.discountedPrice > 0
                    ? product.weights[0].discountedPrice
                    : null;

                return (
                  <Grid
                    item
                    key={product._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ flex: "1 1 300px", maxWidth: "400px" }}
                  >
                    <Card
                      component={Link}
                      to={`/product/${product._id}`}
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                        height: "100%",
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
                        onClick={(e) => e.preventDefault()} // ✅ prevents navigation when clicking heart
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

                      {/* Product Details */}
                      <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          {product.name}
                        </Typography>

                        {/* Rating */}
                        <Box sx={{ mb: 1 }}>
                          <Rating
                            value={product.ratings}
                            precision={0.5}
                            readOnly
                          />
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ ml: 1 }}
                          >
                            ({product.ratings.toFixed(1)})
                          </Typography>
                        </Box>

                        {/* Price */}
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#f48fb1",
                            fontWeight: "bold",
                            mb: 2,
                          }}
                        >
                          {discountPrice ? (
                            <>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  marginRight: "8px",
                                  color: "#999",
                                }}
                              >
                                ₹{lowestPrice}
                              </span>
                              ₹{discountPrice}
                            </>
                          ) : (
                            <>₹{lowestPrice}</>
                          )}
                        </Typography>

                        {/* Add to Cart */}
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#f48fb1",
                            color: "#f48fb1",
                            borderRadius: "25px",
                            px: 3,
                            "&:hover": {
                              bgcolor: "#f48fb1",
                              color: "white",
                            },
                          }}
                          onClick={(e) => e.preventDefault()} // ✅ prevent link navigation
                        >
                          Add to Cart
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
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box p={2} sx={{ width: "80vw", maxWidth: 300 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Filters
          </Typography>
          <Button
            onClick={clearFilters}
            size="small"
            sx={{ color: "purple", mb: 2 }}
          >
            Clear All
          </Button>

          {/* Price */}
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
            <Rating
              value={rating}
              onChange={(e, newVal) => setRating(newVal)}
            />
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
                      control={
                        <Checkbox
                          checked={flavours.includes(f)}
                          onChange={() => handleFlavourChange(f)}
                        />
                      }
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
                      control={
                        <Checkbox
                          checked={weights.includes(w)}
                          onChange={() => handleWeightChange(w)}
                        />
                      }
                      label={w}
                    />
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

export default ProductByCategory;
