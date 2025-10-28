import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplyIcon from "@mui/icons-material/Reply";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Absolutely delicious! The chocolate truffle cake was perfect.",
    cakeImage:
      "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400",
  },
  {
    id: 2,
    name: "Emily Smith",
    rating: 4,
    comment: "Loved the design and taste. Delivery was on time too!",
    cakeImage:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400",
  },
  {
    id: 3,
    name: "Rahul Verma",
    rating: 2,
    comment: "Cake was tasty but delivery was delayed by 2 hours.",
    cakeImage:
      "https://images.unsplash.com/photo-1599785209798-9f4f5e3b8c3a?w=400",
  },
  {
    id: 4,
    name: "Priya Sharma",
    rating: 5,
    comment: "Perfect for my daughter’s birthday. Beautifully made!",
    cakeImage:
      "https://images.unsplash.com/photo-1612198733460-2af8a7a4b4b8?w=400",
  },
  {
    id: 5,
    name: "Arjun Mehta",
    rating: 3,
    comment: "Good cake overall, just a bit too sweet for my liking.",
    cakeImage:
      "https://images.unsplash.com/photo-1606312619070-9d8b45696a3f?w=400",
  },
];

const ReviewsFeedbackSwiper = () => {
  // determine sentiment color based on rating
  const getSentimentColor = (rating) => {
    if (rating >= 4) return "#e8f5e9"; // greenish
    if (rating <= 2) return "#ffebee"; // reddish
    return "#fffde7"; // yellowish
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        ⭐ Reviews & Feedback
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Hear what our happy (and honest) customers say about their cakes!
      </Typography>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: "30px" }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <Card
              sx={{
                backgroundColor: getSentimentColor(review.rating),
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={review.cakeImage}
                alt={review.name}
                sx={{ height: 180, objectFit: "cover" }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {review.name}
                </Typography>
                <Rating
                  value={review.rating}
                  readOnly
                  precision={0.5}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {review.comment}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Tooltip title="Approve">
                    <IconButton color="success" size="small">
                      <CheckCircleIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reply">
                    <IconButton color="primary" size="small">
                      <ReplyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ReviewsFeedbackSwiper;
