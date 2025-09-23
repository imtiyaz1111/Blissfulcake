import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { createProduct } from "../../../Api/functions/productFunctions";
import { useAuth } from "../../../context/AuthProvider";
import { getAllCategories } from "../../../Api/functions/categoriesFunction";

const AddProduct = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const token = auth.token;
  const [categoryData, setCategoryData] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    flavor: "",
    deliveryInformation: "",
    careInstructions: "",
    manufactureDetails: "",
    countInStock: "",
    quantity: 1,
    weights: [],
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  //   getAllCategory
  useEffect(() => {
    getAllCategories(setCategoryData);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle rich text change
  const handleEditorChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  // Handle weight price update
  const handleWeightChange = (index, field, value) => {
    const updatedWeights = [...product.weights];
    updatedWeights[index][field] = value;
    setProduct({ ...product, weights: updatedWeights });
  };

  // Add new weight option
  const handleAddWeight = () => {
    setProduct({
      ...product,
      weights: [
        ...product.weights,
        { label: "", price: 0, discountedPrice: 0 },
      ],
    });
  };

  // Remove weight option
  const handleRemoveWeight = (index) => {
    const updatedWeights = [...product.weights];
    updatedWeights.splice(index, 1);
    setProduct({ ...product, weights: updatedWeights });
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setProduct({ ...product, image: null });
    setPreview(null);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("product",product)
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("flavor", product.flavor);
    formData.append("deliveryInformation", product.deliveryInformation);
    formData.append("careInstructions", product.careInstructions);
    formData.append("manufactureDetails", product.manufactureDetails);
    formData.append("countInStock", product.countInStock);
    formData.append("quantity", product.quantity);
    formData.append("weights", JSON.stringify(product.weights));
    if (product.image) formData.append("image", product.image);
    console.log("formdata",formData)
    createProduct(formData, navigate, setLoading, token);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Add New Product
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Fill product details
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      {/* Form */}
      <Paper
        sx={{
          maxWidth: "100%",
          mx: "auto",
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "#fff",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextField
                  label="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  fullWidth
                  
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                {" "}
                <ReactQuill
                  theme="snow"
                  placeholder="Description"
                  value={product.description}
                  onChange={(val) => handleEditorChange("description", val)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                {" "}
                <ReactQuill
                  placeholder="Delivery Information"
                  theme="snow"
                  value={product.deliveryInformation}
                  onChange={(val) =>
                    handleEditorChange("deliveryInformation", val)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                {" "}
                <ReactQuill
                  placeholder="Care Instructions"
                  theme="snow"
                  value={product.careInstructions}
                  onChange={(val) =>
                    handleEditorChange("careInstructions", val)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                {" "}
                <ReactQuill
                  placeholder="Manufacture Details"
                  theme="snow"
                  value={product.manufactureDetails}
                  onChange={(val) =>
                    handleEditorChange("manufactureDetails", val)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  fullWidth
                
                >
                  {categoryData.map((cat, idx) => (
                    <MenuItem key={idx} value={cat.category}>
                      {cat.category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
                <TextField
                  label="Flavor"
                  name="flavor"
                  value={product.flavor}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
                <TextField
                  type="number"
                  label="Stock Count"
                  name="countInStock"
                  value={product.countInStock}
                  onChange={handleChange}
                  fullWidth
                 
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
                {" "}
                <TextField
                  type="number"
                  label="Quantity"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Weight Options
                  </Typography>
                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddWeight}
                    variant="outlined"
                    size="small"
                  >
                    Add Weight
                  </Button>
                </Box>

                {product.weights.map((w, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      mb: 2,
                      p: 2,
                      border: "1px solid #ddd",
                      borderRadius: 2,
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                        <TextField
                          label="Label (e.g. 1kg)"
                          value={w.label}
                          onChange={(e) =>
                            handleWeightChange(index, "label", e.target.value)
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                        <TextField
                          type="number"
                          label="Price"
                          value={w.price}
                          onChange={(e) =>
                            handleWeightChange(index, "price", e.target.value)
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                        <TextField
                          type="number"
                          label="Discounted Price"
                          value={w.discountedPrice}
                          onChange={(e) =>
                            handleWeightChange(
                              index,
                              "discountedPrice",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    {/* Delete Icon positioned absolute */}
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveWeight(index)}
                      sx={{ position: "absolute", top: 4, right: 4 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Button variant="outlined" component="label">
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {product.image ? product.image.name : "No file chosen"}
                </Typography>
                {preview && (
                  <Box
                    mt={2}
                    sx={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={preview}
                      alt="preview"
                      style={{
                        maxWidth: "200px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                    {/* Close icon on preview image */}
                    <IconButton
                      size="small"
                      color="error"
                      onClick={handleRemoveImage}
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        bgcolor: "white",
                        boxShadow: 2,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.2, fontSize: "16px", borderRadius: 2 }}
                >
                  {loading == true ? "Publish...." : "   Publish Product"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
