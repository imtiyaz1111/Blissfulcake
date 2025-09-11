// Reviews.js
import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import review1 from "../assets/reviews/review1.png";
import review2 from "../assets/reviews/review2.png";
import review3 from "../assets/reviews/review3.png";

const ReviewSection = () => {
  const reviews = [review1, review2, review3, review1, review2, review3];

  return (
    <Box sx={{ py: 6, backgroundColor: "#FDEFF1" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Customer Reviews
      </Typography>

      {/* Small paragraph under heading */}
      <Typography
        align="center"
        sx={{
          mt: 1,
          mb: 4,
          fontSize: "16px",
          color: "#666",
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        Here’s what our happy customers are saying about our cakes. We’re grateful
        for the love and support! 🍰💖
      </Typography>

      <Swiper
        spaceBetween={10} // 🔹 reduced spacing
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1500}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 8 },
          600: { slidesPerView: 2, spaceBetween: 10 },
          960: { slidesPerView: 3, spaceBetween: 12 },
          1280: { slidesPerView: 4, spaceBetween: 15 },
        }}
        modules={[Autoplay]}
      >
        {reviews.map((img, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                height: 400,
                width: 300,
                mx: "auto", // 🔹 keeps cards centered
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`Review ${index + 1}`}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ReviewSection;
