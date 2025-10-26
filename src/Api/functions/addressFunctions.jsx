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

export const deleteAddress = async (id, token, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(
      ADDRESS_ENDPOINTS.deleteAddress(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.success === true) {
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Delete Address failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const getAllAddress = async (setAllAddresses,token,setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      ADDRESS_ENDPOINTS.getAllAddress,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.success === true) {
      setAllAddresses(res.data.data);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Fetch All Address failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
