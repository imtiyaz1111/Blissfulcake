import axiosInstance from "../axiosIntance";
import Category_ENDPOINTS from "../endPoint/categoriesEndPoint";
import { toast } from "react-toastify";

export const getAllCategories = async (setCategoryData) => {
  try {
    const res = await axiosInstance.get(Category_ENDPOINTS.getAllCategories);
    if (res) {
      setCategoryData(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
;

export const getSingleCategories = async (id) => {
  try {
    const response = await axiosInstance.get(Category_ENDPOINTS.getSingleCategories(id));
    if (response.data.success === true) {
      return response.data.data; // return category object
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const createCategories = async (data, navigate, setLoading, token) => {
  try {
    setLoading(true);
    const response = await axiosInstance.post(
      Category_ENDPOINTS.createCategories,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/category/manage");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Create Category failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const updateCategories = async (data, navigate, setLoading, token,id) => {
  try {
    setLoading(true);
    const response = await axiosInstance.put(
      Category_ENDPOINTS.updateCategories(id),
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.success==true) {
      toast.success(response.data.message);
      navigate("/category/manage");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Update Category failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const deleteCategories = async (id, token) => {
  try {
    const response = await axiosInstance.delete(
      Category_ENDPOINTS.deleteCategories(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Delete Category failed. Please try again."
    );
  }
};
