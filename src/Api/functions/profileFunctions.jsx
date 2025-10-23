import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import PROFILE_ENDPOINTS from "../endPoint/profileEndPoint";

export const getProfile = async (setProfileData, token,setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(PROFILE_ENDPOINTS.getProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success == true) {
      setProfileData(res.data.data);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Fetch Profile failed. Please try again."
    );
  }finally{
    setLoading(false);
  }
};

export const updateProfile = async (fromData, token) => {
  try {
    const res = await axiosInstance.put(PROFILE_ENDPOINTS.updteProfile,fromData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success == true) {
      setProfileData(res.data.data);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Update Profile failed. Please try again."
    );
  }
};
