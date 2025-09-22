import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import HomeBanner_ENDPOINTS from "../endPoint/homeBannerEndPoint";

export const getAllBanner = async (setBannerData) => {
  try {
    const res = await axiosInstance.get(HomeBanner_ENDPOINTS.getAllHomeBanner);
    if (res) {
      setBannerData(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadBanner = async (formData, token, navigate, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.post(
      HomeBanner_ENDPOINTS.UPLOADBANNER,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success === true) {
      toast.success(response.data.message);
      navigate("/banner/manage");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to upload banner");
  } finally {
    setLoading(false);
  }
};

export const deleteBanner = async (id, setLoading,token) => {
  try {
    setLoading(true);
    const response = await axiosInstance.delete(
      HomeBanner_ENDPOINTS.DELETEBARNNER(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.success === true) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete banner");
  } finally {
    setLoading(false);
  }
};
