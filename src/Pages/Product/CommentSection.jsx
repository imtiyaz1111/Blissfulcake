import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Avatar,
  Paper,
  Stack,
} from "@mui/material";

const CommentSection = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Muhammad Zeeshan Khan",
      rating: 5,
      text: "A great stroller for kids.",
    },
  ]);

  const handleSubmit = () => {
    if (!review.trim() || rating === 0) return;
    const newReview = {
      id: Date.now(),
      name: "You",
      rating,
      text: review.trim(),
    };
    setReviews([newReview, ...reviews]);
    setReview("");
    setRating(0);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e8f3ff",
        minHeight: "100vh",
        py: 4,
        px: { xs: 2, sm: 6, md: 10 },
      }}
    >
      {/* Leave a Review */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 2,
          p: 3,
          maxWidth: 700,
          mx: "auto",
          mb: 4,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Leave a Review
        </Typography>

        {/* Rating */}
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="large"
          sx={{ mb: 2 }}
        />

        {/* TextArea */}
        <TextField
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{
            backgroundColor: "#f9fcff",
            borderRadius: 2,
            mb: 2,
          }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            textTransform: "none",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Submit Review
        </Button>
      </Box>

      {/* Customer Reviews */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 2,
          p: 3,
          maxWidth: 700,
          mx: "auto",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Customer Review
        </Typography>

        {reviews.map((rev) => (
          <Paper
            key={rev.id}
            sx={{
              backgroundColor: "#e8f3ff",
              p: 2,
              mb: 2,
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>{rev.name.charAt(0)}</Avatar>
              <Box>
                <Typography fontWeight="bold">{rev.name}</Typography>
                <Rating value={rev.rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {rev.text}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}

        {reviews.length === 0 && (
          <Typography textAlign="center" color="text.secondary">
            No reviews yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CommentSection;
