import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthProvider";
import { getAllReviewImg, deleteReviewImg } from "../../../Api/functions/reviewImgFunctions"; // ✅ new API funcs
import Loading from "../../../components/Loading/Loading";
import { baseURL } from "../../../Api/axiosIntance";

const AllReviewImgList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const [auth] = useAuth();
  const token = auth?.token;

  // Fetch reviews on mount
  useEffect(() => {
    getAllReviewImg(setReviews, setLoading)
  }, []);

  // Delete click handler
  const handleDeleteClick = (reviewItem) => {
    setSelectedReview(reviewItem);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReview(null);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!token) return toast.error("Please login to delete review images");
    if (!selectedReview) return;
    const id = selectedReview._id;

    try {
      await deleteReviewImg(id, token, setLoading);
      setReviews((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Failed to delete review image");
    } finally {
      setOpenDialog(false);
      setSelectedReview(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            sx={{
              background: "linear-gradient(135deg, #ff94a3, #f48fb1)",
              color: "#fff",
              borderRadius: 2,
              width: 40,
              height: 40,
              "&:hover": { opacity: 0.9 },
            }}
          >
            <PhotoLibraryIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Review
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Overview
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      {/* Review List */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Loading />
        </Box>
      ) : reviews.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No reviews found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {reviews.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                  position: "relative",
                  height: "100%",
                }}
              >
                {/* Delete Button */}
                <IconButton
                  aria-label="delete review image"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(255,0,0,0.7)" },
                  }}
                  onClick={() => handleDeleteClick(item)}
                >
                  <DeleteIcon />
                </IconButton>

                <CardMedia
                  component="img"
                  image={`${baseURL}${item.reviewImg}`} // ✅ adjust field name
                  alt={`Review ${item._id}`}
                  sx={{
                    width: 280,
                    height: 250,
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this review image?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllReviewImgList;
