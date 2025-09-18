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

const AddCategory = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");

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
    // API call can go here
    console.log("Category Submitted:", { title: categoryTitle, image: selectedImage });
    alert("Category added successfully!");
    // Reset form
    setSelectedImage(null);
    setCategoryTitle("");
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
          Add New Category
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Upload
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

          {/* Submit Button */}
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
            Add Category
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCategory;
