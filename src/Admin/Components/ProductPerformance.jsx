import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Rating,
  Chip,
  Divider,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    image: "https://i.ibb.co/D4nBbz5/cake1.jpg",
    price: "$25",
    sales: 120,
    stock: 5,
    rating: 4.8,
    dateAdded: "Oct 25, 2025",
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    image: "https://i.ibb.co/tJhhmV4/cake2.jpg",
    price: "$30",
    sales: 95,
    stock: 2,
    rating: 4.6,
    dateAdded: "Oct 22, 2025",
  },
  {
    id: 3,
    name: "Black Forest Cake",
    image: "https://i.ibb.co/YcxS6ZL/cake3.jpg",
    price: "$28",
    sales: 60,
    stock: 12,
    rating: 4.4,
    dateAdded: "Oct 20, 2025",
  },
  {
    id: 4,
    name: "Strawberry Delight Cake",
    image: "https://i.ibb.co/02McznQ/cake4.jpg",
    price: "$27",
    sales: 45,
    stock: 3,
    rating: 4.2,
    dateAdded: "Oct 24, 2025",
  },
  {
    id: 5,
    name: "Vanilla Cream Cake",
    image: "https://i.ibb.co/0sWmCfk/cake5.jpg",
    price: "$22",
    sales: 38,
    stock: 8,
    rating: 4.1,
    dateAdded: "Oct 21, 2025",
  },
  {
    id: 6,
    name: "Coffee Walnut Cake",
    image: "https://i.ibb.co/p4m3G4x/cake6.jpg",
    price: "$26",
    sales: 85,
    stock: 1,
    rating: 4.7,
    dateAdded: "Oct 26, 2025",
  },
];

const ProductPerformance = () => {
  const topSelling = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);
  const lowStock = products.filter((p) => p.stock <= 3);

  return (
    <Box mt={3}>
      <Paper
        sx={{
         p: 3,
          borderRadius: "12px",
          background: "linear-gradient(180deg, #fff6f9 0%, #ffe6ee 100%)",
          border: "1px solid #ffd6e0",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
        elevation={0}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
          sx={{color: "#d63384"}}
        >
          Product Performance
        </Typography>
        {/* ---- Top Selling Cakes ---- */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            🏆 Top-Selling Cakes
          </Typography>
        </Box>
        <Box sx={{ position: "relative" }}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            style={{ paddingBottom: "40px" }}
          >
            {topSelling.map((cake, index) => (
              <SwiperSlide key={cake.id}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 2px 12px rgba(0,0,0,0.05)",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={cake.image}
                    alt={cake.name}
                    sx={{
                      width: "100%",
                      height: 160,
                      borderRadius: "12px",
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ color: "#000000" }}
                  >
                    {index + 1}. {cake.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Price: {cake.price}
                  </Typography>

                  <Rating
                    value={cake.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      🛒 Sales:{" "}
                      <Typography component="span" fontWeight={600}>
                        {cake.sales}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📦 Stock:{" "}
                      <Typography component="span" fontWeight={600}>
                        {cake.stock}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📅 Added:{" "}
                      <Typography component="span" fontWeight={600}>
                        {cake.dateAdded}
                      </Typography>
                    </Typography>
                  </Box>
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Modern Circular Swiper Arrows (matching CustomersOverview) */}
          <style>
            {`
            .swiper-button-next, .swiper-button-prev {
              color: #000 !important;
              background: #fff;
              border-radius: 50%;
              width: 38px;
              height: 38px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.08);
              transition: all 0.3s ease;
            }
            .swiper-button-next::after, .swiper-button-prev::after {
              font-size: 16px;
              font-weight: bold;
            }
            .swiper-button-next:hover, .swiper-button-prev:hover {
              background: #f5f5f5;
              transform: scale(1.1);
              box-shadow: 0 6px 14px rgba(0,0,0,0.12);
            }
            .swiper-button-prev {
              left: -20px;
            }
            .swiper-button-next {
              right: -20px;
            }
            .swiper-pagination-bullet {
              background: #bdbdbd !important;
              opacity: 0.7;
            }
            .swiper-pagination-bullet-active {
              background: #000 !important;
              opacity: 1;
            }
          `}
          </style>
        </Box>
      </Paper>

      {/* ---- Low Stock Alerts ---- */}
      <Typography variant="subtitle1" fontWeight={600} mt={5} mb={2}>
        ⚠️ Low Stock Alerts
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {lowStock.map((item) => (
          <Paper
            key={item.id}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              width: "260px",
              backgroundColor: "#fff8f0",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={item.image}
                alt={item.name}
                variant="rounded"
                sx={{ width: 56, height: 56, borderRadius: "12px" }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ color: "#000000" }}
                >
                  {item.name}
                </Typography>
                <Chip
                  label={`Stock: ${item.stock}`}
                  color="error"
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ProductPerformance;
