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
import { toast } from "react-toastify";
import { createCategories } from "../../../Api/functions/categoriesFunction";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

const AddCategory = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth] = useAuth();
  const token = auth?.token;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile || !categoryTitle.trim()) {
      toast.error("Please enter category title and select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("category", categoryTitle);
    formData.append("image", selectedFile);

    createCategories(formData, navigate, setLoading, token);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
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
          <TextField
            label="Category Title"
            variant="outlined"
            fullWidth
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            {previewImage ? "Change Image" : "Upload Category Image"}
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>

          {previewImage && (
            <Card sx={{ width: "100%", position: "relative" }}>
              <CardMedia component="img" height="200" image={previewImage} />
              <IconButton
                onClick={handleDeleteImage}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ background: "linear-gradient(135deg, #ff94a3, #f48fb1)" }}
          >
            {loading ? "Adding..." : "Add Category"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCategory;
