import React from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    totalOrders: 12,
    totalSpent: "$540.00",
    lastOrder: "Oct 20, 2025",
    avatar: "https://i.ibb.co/D4nBbz5/cake1.jpg",
  },
  {
    id: 2,
    name: "Emma Watson",
    email: "emma@example.com",
    phone: "+91 99321 65478",
    totalOrders: 9,
    totalSpent: "$420.00",
    lastOrder: "Oct 22, 2025",
    avatar: "https://i.ibb.co/tJhhmV4/cake2.jpg",
  },
  {
    id: 3,
    name: "Michael Smith",
    email: "michael@example.com",
    phone: "+91 99987 65432",
    totalOrders: 15,
    totalSpent: "$850.00",
    lastOrder: "Oct 23, 2025",
    avatar: "https://i.ibb.co/YcxS6ZL/cake3.jpg",
  },
  {
    id: 4,
    name: "Sophia Lee",
    email: "sophia@example.com",
    phone: "+91 98231 76342",
    totalOrders: 7,
    totalSpent: "$320.00",
    lastOrder: "Oct 25, 2025",
    avatar: "https://i.ibb.co/02McznQ/cake4.jpg",
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@example.com",
    phone: "+91 98123 46789",
    totalOrders: 10,
    totalSpent: "$560.00",
    lastOrder: "Oct 27, 2025",
    avatar: "https://i.ibb.co/0sWmCfk/cake5.jpg",
  },
  {
    id: 6,
    name: "Lara Croft",
    email: "lara@example.com",
    phone: "+91 98452 89765",
    totalOrders: 8,
    totalSpent: "$490.00",
    lastOrder: "Oct 28, 2025",
    avatar: "https://i.ibb.co/p4m3G4x/cake6.jpg",
  },
];

const CustomersOverview = () => {
  return (
    <Box
      sx={{
        mt: 3,
        width: "100%",
      }}
    >
      {/* Main Paper Wrapper */}
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
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
          sx={{ color: "#d63384" }}
        >
          Customers Overview
        </Typography>
        {/* Custom Navigation Buttons */}
        <IconButton
          className="swiper-button-prev-custom"
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "#FDEFF1",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
            "&:hover": { backgroundColor: "#f48fb1" },
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          className="swiper-button-next-custom"
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "#FDEFF1",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
            "&:hover": { backgroundColor: "#f48fb1" },
          }}
        >
          <ArrowForwardIos sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            600: { slidesPerView: 2 },
            960: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          style={{ paddingBottom: "40px" }}
        >
          {customers.map((customer) => (
            <SwiperSlide key={customer.id}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #f0f0f0",
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.04)",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
                  },
                }}
                elevation={0}
              >
                {/* Avatar + Name */}
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar
                    src={customer.avatar}
                    alt={customer.name}
                    sx={{
                      width: 56,
                      height: 56,
                      border: "2px solid #e0e0e0",
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ color: "#000000" }}
                    >
                      {customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {customer.email}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Customer Details */}
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body2" color="text.secondary">
                    📞 {customer.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🛍️ Total Orders:{" "}
                    <Typography component="span" fontWeight={600}>
                      {customer.totalOrders}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    💰 Total Spent:{" "}
                    <Typography component="span" fontWeight={600}>
                      {customer.totalSpent}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📅 Last Order:{" "}
                    <Typography component="span" fontWeight={600}>
                      {customer.lastOrder}
                    </Typography>
                  </Typography>
                </Box>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Paper>
    </Box>
  );
};

export default CustomersOverview;
