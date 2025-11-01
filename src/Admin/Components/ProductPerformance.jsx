import React, { useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { getAllProduct } from "../../Api/functions/productFunctions";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductPerformance = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProduct(setProducts, setLoading);
  }, []);

  const topSelling = [...products]
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 5);

  const lowStock = products.filter((p) => p.countInStock <= 3);

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
          sx={{ color: "#d63384" }}
        >
          Product Performance
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={180}
          >
            <Loader2 className="animate-spin" size={24} color="#d63384" />
            <Typography ml={1}>Loading products...</Typography>
          </Box>
        ) : products.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            py={6}
          >
            No products found.
          </Typography>
        ) : (
          <>
            {/* ---- Top Selling Products ---- */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                🏆 Top-Selling Products
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
                {topSelling.map((product, index) => (
                  <SwiperSlide key={product._id}>
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
                        src={product.image}
                        alt={product.name}
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
                        {index + 1}. {product.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Price: ₹
                        {product.weights?.[0]?.price ||
                          product.discountedPrice ||
                          "N/A"}
                      </Typography>

                      <Rating
                        value={product.ratings || 0}
                        precision={0.1}
                        readOnly
                        size="small"
                      />

                      <Divider sx={{ my: 2 }} />

                      <Box display="flex" flexDirection="column" gap={0.5}>
                        <Typography variant="body2" color="text.secondary">
                          🛒 Sales:{" "}
                          <Typography component="span" fontWeight={600}>
                            {product.sales || 0}
                          </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📦 Stock:{" "}
                          <Typography component="span" fontWeight={600}>
                            {product.countInStock}
                          </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📅 Added:{" "}
                          <Typography component="span" fontWeight={600}>
                            {new Date(product.createdAt).toLocaleDateString()}
                          </Typography>
                        </Typography>
                      </Box>
                    </Paper>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Swiper Styles */}
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
                .swiper-button-prev { left: -20px; }
                .swiper-button-next { right: -20px; }
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
          </>
        )}
      </Paper>

      {/* ---- Low Stock Alerts ---- */}
      {!loading && products.length > 0 && (
        <>
          <Typography variant="subtitle1" fontWeight={600} mt={5} mb={2}>
            ⚠️ Low Stock Alerts
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {lowStock.length === 0 ? (
              <Typography color="text.secondary">
                All products have sufficient stock.
              </Typography>
            ) : (
              lowStock.map((item) => (
                <Paper
                  key={item._id}
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
                        label={`Stock: ${item.countInStock}`}
                        color="error"
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>
                </Paper>
              ))
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductPerformance;
