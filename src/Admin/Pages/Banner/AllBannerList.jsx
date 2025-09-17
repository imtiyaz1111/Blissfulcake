import React, { useState } from "react";
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

const banners = [
  {
    id: 1,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F3677%2Fbanner2.jpg&w=1920&q=75",
  },
  {
    id: 2,
    image:
      "https://mioamoreshop.com/_next/image?url=https%3A%2F%2Fapi.mioamoreshop.com%2Fstorage%2F9334%2Fmio-slider-1-(1).png&w=1920&q=75",
  },
];

const AllBannerList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBanner(null);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting banner:", selectedBanner);
    // You can replace console.log with API call to delete the banner
    setOpenDialog(false);
    setSelectedBanner(null);
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
        {banners.map((banner) => (
          <Grid item xs={12} key={banner.id}>
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
                image={banner.image}
                alt={`Banner ${banner.id}`}
                sx={{ width: "100%", height: { xs: 180, sm: 250, md: 320 }, objectFit: "cover" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>Delete Banner</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this banner?
          </Typography>
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

export default AllBannerList;
