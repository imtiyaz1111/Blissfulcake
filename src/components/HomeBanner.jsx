// CakeBanner.js
import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const HomeBanner = () => {
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Box className="cakeBannerSection">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          style={{ width: "100%" }}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <Box
              component="img"
              src="https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F3677%2Fbanner2.jpg&w=1920&q=75"
              alt="Chocolate Cake"
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "300px", md: "450px", lg: "500px" },
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <Box
              component="img"
              src="https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F9334%2Fmio-slider-1-(1).png&w=1920&q=75"
              alt="Birthday Cake"
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "300px", md: "450px", lg: "500px" },
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default HomeBanner;
