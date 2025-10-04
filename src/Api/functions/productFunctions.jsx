import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import PRODUCT_ENDPOINTS from "../endPoint/productEndPoint";

// GET ALL PRODUCTS
export const getAllProduct = async (setAllProductData, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.get(PRODUCT_ENDPOINTS.GET_ALL_PRODUCT);
    if (response.data.success == true) {
      setAllProductData(response.data.data);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch products");
  } finally {
    setLoading(false);
  }
};
// GET ALL PRODUCTS by category
export const getAllProductByCategory = async (setAllProductByCategory, id,setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.get(PRODUCT_ENDPOINTS.GET_ALL_PRODUCT_BY_CATEGORY(id));
    if (response.data.success == true) {
      setAllProductByCategory(response.data.data);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch products");
  } finally {
    setLoading(false);
  }
};

// ✅ Get Single Product by ID
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      PRODUCT_ENDPOINTS.GET_SINGLE_PRODUCT(id)
    );

    if (response?.data?.success === true) {
      return response.data.data; // return product details
    } else {
      toast.error(response?.data?.message || "Failed to fetch product");
      return null; // return null if not successful
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    toast.error(
      error.response?.data?.message ||
        "Something went wrong while fetching product"
    );
    return null; // always return something to avoid undefined issues
  }
};

// CREATE PRODUCT
export const createProduct = async (formData, navigate, setLoading, token) => {
  try {
    setLoading(true);
    const response = await axiosInstance.post(
      PRODUCT_ENDPOINTS.CREATE_PRODUCT,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success == true) {
      toast.success(response.data.message);
      navigate("/product/manage");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create product");
  } finally {
    setLoading(false);
  }
};

// UPDATE PRODUCT ✅ added
export const updateProductById = async (
  id,
  formData,
  navigate,
  setLoading,
  token
) => {
  try {
    setLoading(true);

    const response = await axiosInstance.put(
      PRODUCT_ENDPOINTS.UPDATE_PRODUCT(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success === true) {
      toast.success(response.data.message);
      navigate("/product/manage");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update product");
    return false;
  } finally {
    setLoading(false);
  }
};

// COMMENT STATUS UPDATE
export const updateCommentStatus = async (
  productId,
  commentId,
  status,
  token
) => {
  try {
    const response = await axiosInstance.put(
      PRODUCT_ENDPOINTS.COMMENT_STATUS_PRODUCT(productId, commentId),
      { status }, // ✅ ensure correct body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success == true) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to change comment status"
    );
  }
};

// REPLY TO COMMENT
export const replyToComment = async (productId, commentId, reply, token) => {
  try {
    const response = await axiosInstance.post(
      PRODUCT_ENDPOINTS.REPLY_COMMENT_PRODUCT(productId, commentId),
      reply, // ✅ send in correct format
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success == true) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to reply to comment");
  }
};

// DELETE PRODUCT
export const deleteProductById = async (id, token) => {
  try {
    const response = await axiosInstance.delete(
      PRODUCT_ENDPOINTS.DELETE_PRODUCT(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success == true) {
      toast.success(response.data.message);
      return true; // ✅ return for frontend to use
    }
    return false;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete product");
    return false;
  }
};
