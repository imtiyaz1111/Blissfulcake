// HomeBanner.js
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { getAllBanner } from "../Api/functions/homeBannerFunctions";
import { baseURL } from "../Api/axiosIntance";

const HomeBanner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    getAllBanner(setBannerData,setLoading);
  }, []);

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
          {bannerData.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <Box
                component="img"
                src={`${baseURL}${item.bannerImg}`}
                alt={`Banner ${index + 1}`}
                sx={{
                  width: "100%",
                  height: {
                    xs: "200px",
                    sm: "300px",
                    md: "450px",
                    lg: "500px",
                  },
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HomeBanner;
