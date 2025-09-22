import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { uploadBanner } from "../../../Api/functions/homeBannerFunctions";
import { toast } from "react-toastify";

const AddBanner = () => {
  const [selectedImage, setSelectedImage] = useState(null); // for preview
  const [selectedFile, setSelectedFile] = useState(null); // for actual file
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const token = auth.token;

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // store actual file
      setSelectedImage(URL.createObjectURL(file)); // store preview
    }
  };

  // Handle image delete
  const handleDeleteImage = () => {
    setSelectedFile(null);
    setSelectedImage(null);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return toast.error("Please select a banner image");

    const formData = new FormData();
    formData.append("bannerImg", selectedFile);

    uploadBanner(formData, token, navigate, setLoading);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Typography variant="h6" fontWeight="bold">Add New Banner</Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">Upload</Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}
             sx={{ maxWidth: 500, margin: "0 auto", p: 3, borderRadius: 2, bgcolor: "#fff", boxShadow: 3 }}>

          {/* Upload Button */}
          <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} fullWidth
                  sx={{ borderRadius: 2, textTransform: "none", height: 50 }}>
            {selectedImage ? "Change Image" : "Upload Banner"}
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>

          {/* Preview */}
          {selectedImage && (
            <Card sx={{ width: "100%", borderRadius: 2, overflow: "hidden", position: "relative" }}>
              <CardMedia component="img" height="200" image={selectedImage} alt="Banner Preview" />
              <IconButton onClick={handleDeleteImage}
                          sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(0,0,0,0.6)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,0.8)" } }}>
                <DeleteIcon />
              </IconButton>
            </Card>
          )}

          {/* Submit Button */}
          <Button type="submit" variant="contained" fullWidth
                  sx={{ borderRadius: 2, textTransform: "none", height: 50, background: "linear-gradient(135deg, #ff94a3, #f48fb1)" }}>
            {loading ? "Loading..." : "Add Banner"}
          </Button>

        </Box>
      </form>
    </Box>
  );
};

export default AddBanner;
