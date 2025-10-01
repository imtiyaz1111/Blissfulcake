// ShopPage.js
import React, { useState } from "react";
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

const products = [
  { id: 1, name: "Dark Chocolate", price: 250, rating: 4, flavour: "Dark", weight: "100g", image: "https://www.warmoven.in/cdn/shop/files/duel-delight-chocolate_-cake.jpg?v=1749833568&width=1080" },
  { id: 2, name: "Milk Chocolate", price: 180, rating: 5, flavour: "Milk", weight: "200g", image: "https://www.warmoven.in/cdn/shop/files/duel-delight-chocolate_-cake.jpg?v=1749833568&width=1080" },
  { id: 3, name: "Hazelnut Chocolate", price: 300, rating: 4, flavour: "Hazelnut", weight: "150g", image: "https://www.warmoven.in/cdn/shop/files/duel-delight-chocolate_-cake.jpg?v=1749833568&width=1080" },
  { id: 4, name: "White Chocolate", price: 200, rating: 3, flavour: "White", weight: "100g", image: "https://www.warmoven.in/cdn/shop/files/duel-delight-chocolate_-cake.jpg?v=1749833568&width=1080" },
  { id: 5, name: "Caramel Chocolate", price: 220, rating: 5, flavour: "Milk", weight: "120g", image: "https://www.warmoven.in/cdn/shop/files/duel-delight-chocolate_-cake.jpg?v=1749833568&width=1080" },
  { id: 6, name: "Fruit & Nut", price: 280, rating: 4, flavour: "Hazelnut", weight: "150g", image: "https://www.warmoven.in/cdn/shop/files/duel-delight-chocolate_-cake.jpg?v=1749833568&width=1080" },
];

const flavourOptions = ["Dark", "Milk", "Hazelnut", "White"];
const weightOptions = ["100g", "150g", "200g"];

const Products = () => {
  const [price, setPrice] = useState([100, 400]);
  const [rating, setRating] = useState(null);
  const [flavours, setFlavours] = useState([]);
  const [weights, setWeights] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(4);

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
    setPrice([100, 400]);
    setRating(null);
    setFlavours([]);
    setWeights([]);
  };

  const filteredProducts = products
    .filter((p) => p.price >= price[0] && p.price <= price[1])
    .filter((p) => (rating ? p.rating >= rating : true))
    .filter((p) => (flavours.length ? flavours.includes(p.flavour) : true))
    .filter((p) => (weights.length ? weights.includes(p.weight) : true))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase().trim()))
    .sort((a, b) => {
      if (sort === "priceLowHigh") return a.price - b.price;
      if (sort === "priceHighLow") return b.price - a.price;
      if (sort === "ratingHighLow") return b.rating - a.rating;
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <Box p={{ xs: 1, sm: 2, md: 3 }} bgcolor="#f9f9f9" minHeight="500px">
      <Box display="flex" gap={2}>
        {/* Filter Section */}
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            width: "280px",
            flexShrink: 0,
            
          }}
        >
          <Box
            p={2}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 6,
              height: "500px",
              maxHeight: "calc(100vh - 60px)",
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
                max={500}
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

            {/* Weights */}
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
            alignItems={{ xs: "stretch", sm: "center" }}
            mb={2}
          >
            <IconButton
              sx={{ display: { xs: "flex", lg: "none" }, alignSelf: "flex-start" }}
              onClick={() => setMobileOpen(true)}
            >
              <FilterList />
            </IconButton>

            <TextField
              variant="outlined"
              size="small"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              sx={{ maxWidth: { sm: 300, md: 350 } }}
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
          </Box>

          {/* Product Grid */}
          {/* Product Grid */}
          <Grid container spacing={4} justifyContent="center">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <Grid 
                  item 
                  key={product.id} 
                  sx={{ 
                    flex: "1 1 300px", // ✅ minimum width 350px
                    maxWidth: "400px"  // optional, max width
                  }}
                  xs={12}  // 0px - 480px → 1 card
                  sm={6}   // 480px - 1050px → 2 cards
                  md={4}   // 1050px - 1200px → 3 cards
                  lg={3}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%", // ✅ full width of grid item
                      borderRadius: 2,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.08)",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: "0 8px 30px rgba(0,0,0,0.15), 0 12px 12px rgba(0,0,0,0.1)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    {/* Image + Wishlist */}
                    <Box sx={{ position: "relative", width: "100%" }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          height: { xs: 180, md: 200 },
                          objectFit: "cover",
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "white",
                          "&:hover": { bgcolor: "red", color: "white" },
                        }}
                      >
                        ❤️
                      </IconButton>
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ flexGrow: 1, width: "100%" }}>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.weight}
                      </Typography>
                      <Rating value={product.rating} readOnly size="small" sx={{ mt: 1 }} />
                      <Typography variant="h6" mt={1} color="purple">
                        ₹{product.price}
                      </Typography>
                    </CardContent>

                    {/* Buy Now */}
                    <Box sx={{ textAlign: "center", pb: 2, width: "100%" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 5, px: 3 }}
                        fullWidth
                      >
                        Buy Now
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" p={2}>
                No products found.
              </Typography>
            )}
          </Grid>


          {/* Load More button */}
          {visibleCount < filteredProducts.length && (
            <Box textAlign="center" mt={4}>
              <Button
                variant="outlined"
                onClick={() => setVisibleCount((prev) => prev + 4)}
                sx={{ px: 4, py: 1.2, borderRadius: 5 }}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Mobile Drawer for Filters */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
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

          {/* Same Filter Content */}
          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Price
            </Typography>
            <Slider
              value={price}
              onChange={(e, newVal) => setPrice(newVal)}
              valueLabelDisplay="auto"
              min={50}
              max={500}
              sx={{ color: "purple" }}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography>₹{price[0]}</Typography>
              <Typography>₹{price[1]}</Typography>
            </Box>
          </Box>

          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>
              Rating
            </Typography>
            <Rating value={rating} onChange={(e, newVal) => setRating(newVal)} />
          </Box>

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
        </Box>
      </Drawer>
    </Box>
  );
};

export default Products;
