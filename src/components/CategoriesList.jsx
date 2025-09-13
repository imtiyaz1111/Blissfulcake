import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom"; 

// Import category images
import birthday from "../assets/categories/birthday.png";
import wedding from "../assets/categories/anniversary.png";
import kids from "../assets/categories/kids.png";
import cupcakes from "../assets/categories/cupcakes.png";
import theme from "../assets/categories/themeCakes.png";
import donuts from "../assets/categories/donuts.png";
import pastries from "../assets/categories/pastries.png";
import photo from "../assets/categories/photoCakes.png";
import { getAllCategories } from "../Api/functions/categoriesFunction";

const categories = [
  { title: "Birthday Cakes", image: birthday, path: "/category/birthday" },
  { title: "Wedding Cakes", image: wedding, path: "/category/wedding" },
  { title: "Kids’ Cakes", image: kids, path: "/category/kids" },
  { title: "Cupcakes", image: cupcakes, path: "/category/cupcakes" },
  { title: "Theme Cakes", image: theme, path: "/category/theme" },
  { title: "Donuts", image: donuts, path: "/category/donuts" },
  { title: "Pastries", image: pastries, path: "/category/pastries" },
  { title: "Photo Cakes", image: photo, path: "/category/photo-cakes" },
];

const CategoriesList = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(()=>{
    getAllCategories(setCategoryData)
  },[])
  return (
    <Box sx={{ p: 4, background: "#FDEFF1" }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Our Categories
      </Typography>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1200}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {categoryData.map((cat, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                boxShadow: "none",
                background: "transparent",
                textAlign: "center",
              }}
            >
              <CardActionArea
                // component={Link} 
                // to={cat.path}
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:5000${cat.image}`}
                  alt={cat.category}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%", // Circle images
                    objectFit: "cover",
                    mb: 2,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.1)", // Smooth zoom on hover
                    },
                  }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {cat.category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CategoriesList;
