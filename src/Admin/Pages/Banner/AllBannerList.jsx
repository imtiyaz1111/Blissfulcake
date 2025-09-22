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
import TableChartIcon from "@mui/icons-material/TableChart";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBanner, getAllBanner } from "../../../Api/functions/homeBannerFunctions";
import { useAuth } from "../../../context/AuthProvider";
import Loading from "../../../components/Loading/Loading";
import { baseURL } from "../../../Api/axiosIntance";

const AllBannerList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    fetchBanners();
  }, []);

  // Fetch banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      await getAllBanner(setBannerData);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBanner(null);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!selectedBanner) return;
      const id = selectedBanner._id;
      setLoading(true);
      await deleteBanner(id, setLoading, token);
      await fetchBanners(); // refresh banners after deletion
    } catch (error) {
      console.error("Error deleting banner:", error);
    } finally {
      setOpenDialog(false);
      setSelectedBanner(null);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                <TableChartIcon />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">
                Banner
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body1" color="text.secondary">
                Overview
              </Typography>
              <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
            </Box>
          </Box>

          {/* Banner List */}
          <Grid container spacing={2}>
            {bannerData?.map((banner) => (
              <Grid item xs={12} key={banner._id} sx={{ width: "100%" }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    position: "relative",
                    width: "100%",
                  }}
                >
                  {/* Delete Button on Image */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      "&:hover": { bgcolor: "rgba(255,0,0,0.7)" },
                    }}
                    onClick={() => handleDeleteClick(banner)}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <CardMedia
                    component="img"
                    image={`${baseURL}${banner.bannerImg}`}
                    alt={`Banner ${banner._id}`}
                    sx={{
                      width: "100%",
                      height: { xs: 180, sm: 250, md: 320 },
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Delete Confirmation Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
            <DialogTitle>Delete Banner</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this banner?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                color="error"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default AllBannerList;
