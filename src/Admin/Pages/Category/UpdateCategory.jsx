import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const UpdateCategory = ({ categoryData }) => {
  // Pre-fill with categoryData
  const [selectedImage, setSelectedImage] = useState(categoryData?.image || null);
  const [categoryTitle, setCategoryTitle] = useState(categoryData?.title || "");

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Handle image delete
  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage || !categoryTitle.trim()) {
      alert("Please enter category title and select an image.");
      return;
    }
    // API call to update category can go here
    console.log("Category Updated:", { title: categoryTitle, image: selectedImage });
    alert("Category updated successfully!");
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
        <Typography variant="h6" fontWeight="bold">
          Update Category
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Edit & Save
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          sx={{
            maxWidth: 500,
            margin: "0 auto",
            p: 3,
            borderRadius: 2,
            bgcolor: "#fff",
            boxShadow: 3,
          }}
        >
          {/* Category Title Input */}
          <TextField
            label="Category Title"
            variant="outlined"
            fullWidth
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            sx={{ borderRadius: 2 }}
          />

          {/* Upload Button */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: "none",
              height: 50,
            }}
          >
            {selectedImage ? "Change Image" : "Upload Category Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>

          {/* Preview */}
          {selectedImage && (
            <Card
              sx={{
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={selectedImage}
                alt="Category Preview"
              />
              <IconButton
                onClick={handleDeleteImage}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          )}

          {/* Update Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: "none",
              height: 50,
              background: "linear-gradient(135deg, #ff94a3, #f48fb1)",
            }}
          >
            Update Category
          </Button>
        </Box>
      </form>
    </Box>
  );
};

// Example usage with dummy data
// <UpdateCategory categoryData={{ title: "Cakes", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec" }} />

export default UpdateCategory;
