import axiosInstance from "../axiosIntance";
import Gallery_ENDPOINTS from "../endPoint/galleryEndPoint";
import { toast } from "react-toastify";

// Get All Gallery
export const getAllGallery = async (setGalleryData, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(Gallery_ENDPOINTS.getAllGallery);
    if (res?.data?.data) {
      setGalleryData(res.data.data);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch gallery images");
  } finally {
    setLoading(false);
  }
};

// Upload Gallery
export const uploadGallery = async (formData, token, navigate, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.post(
      Gallery_ENDPOINTS.UPLOADGALLERY,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/gallery/manage");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to upload gallery image");
  } finally {
    setLoading(false);
  }
};

// Delete Gallery
export const deleteGallery = async (id, token, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.delete(
      Gallery_ENDPOINTS.DELETEGALLERY(id),
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
    toast.error(error.response?.data?.message || "Failed to delete gallery image");
  } finally {
    setLoading(false);
  }
};
