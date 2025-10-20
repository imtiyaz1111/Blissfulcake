import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import WISHLIST_ENDPOINTS from "../endPoint/wishlistEndPoint";

// Add product to wishlist
export const addWhishlist = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      WISHLIST_ENDPOINTS.addWishlist,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add to wishlist");
    throw error;
  }
};

// Get all wishlist items
export const getAllWhishlist = async (setAllWishlist, token) => {
  try {
    const response = await axiosInstance.get(WISHLIST_ENDPOINTS.getAllWishlist, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      setAllWishlist(response.data.data);
    }
    return response.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch all wishlist"
    );
    throw error;
  }
};

// Delete wishlist item
export const deleteWhishlist = async (id, token) => {
  try {
    const response = await axiosInstance.delete(
      WISHLIST_ENDPOINTS.deleteWishlist(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete wishlist");
    throw error;
  }
};
