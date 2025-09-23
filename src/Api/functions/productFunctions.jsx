import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import PRODUCT_ENDPOINTS from "../endPoint/productEndPoint";

// GET ALL PRODUCTS
export const getAllProduct = async (setAllProductData, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.get(PRODUCT_ENDPOINTS.GET_ALL_PRODUCT);
    if (response.data.success) {
      setAllProductData(response.data.message);
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to all product");
  } finally {
    setLoading(false);
  }
};

// CREATE PRODUCTS
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
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/product/manage");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create product");
  } finally {
    setLoading(false);
  }
};
