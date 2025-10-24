import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import ADDRESS_ENDPOINTS from "../endPoint/addressEndPoint";

export const createAddress = async (formData, token, navigate, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(
      ADDRESS_ENDPOINTS.createAddress,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.success === true) {
      toast.success(res.data.message);
      navigate("/profile/settings/myprofile");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Add Address failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
