import React, { useEffect, useState } from "react";
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
import {
  getSingleCategories,
  updateCategories,
} from "../../../Api/functions/categoriesFunction";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { baseURL } from "../../../Api/axiosIntance";

const UpdateCategory = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const token = auth?.token;

  // ✅ Fetch single category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await getSingleCategories(id);
        if (category) {
          setCategoryTitle(category.category || ""); // set default value in input
          setPreviewImage(
            category.image ? `${baseURL}${category.image}` : null
          );
        } else {
          toast.error("Failed to fetch category details");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching category");
      }
    };

    if (id) fetchCategory();
  }, [id]);

  // ✅ Handle image change
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

  // ✅ Submit update form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryTitle.trim()) {
      toast.error("Please enter category title.");
      return;
    }

    const formData = new FormData();
    formData.append("category", categoryTitle); // backend expects "name"
    if (selectedFile) formData.append("image", selectedFile);

    updateCategories(formData, navigate, setLoading, token,id); // pass id
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h6">Update Category</Typography>
        <InfoOutlinedIcon fontSize="small" />
      </Box>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            maxWidth: 500,
            margin: "0 auto",
            p: 3,
            bgcolor: "#fff",
            boxShadow: 3,
          }}
        >
          <TextField
            label="Category Title"
            fullWidth
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            {previewImage ? "Change Image" : "Upload Category Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>

          {previewImage && (
            <Card sx={{ width: "100%", mt: 2, position: "relative" }}>
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
            sx={{
              mt: 3,
              background: "linear-gradient(135deg, #ff94a3, #f48fb1)",
            }}
          >
            {loading ? "Updating..." : "Update Category"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateCategory;
