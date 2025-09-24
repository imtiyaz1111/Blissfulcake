import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getAllCategories } from "../Api/functions/categoriesFunction";


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
          delay: 1,                   // প্রায় continuous
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={6000}                  // যত বেশি, তত smooth slow scroll
        allowTouchMove={false}        // হাত দিয়ে swipe বন্ধ
        freeMode={true}               // continuous free flow
        freeModeMomentum={false}      // momentum বন্ধ
        modules={[Autoplay]}
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
                border: "2px solid white",
                padding: "10px",
              }}
            >
              <CardActionArea
                sx={{ display: "flex", flexDirection: "column", alignItems: "center",  border: "2px solid white", }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:5000${cat.image}`}
                  alt={cat.category}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mb: 2,
                    padding: "15px 10px",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.1)",
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
