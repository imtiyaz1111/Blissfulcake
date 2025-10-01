import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import Contact_ENDPOINTS from "../endPoint/contactEndPoint";

export const createContact = async (data, navigate) => {
  try {
    const response = await axiosInstance.post(
      Contact_ENDPOINTS.createContact,
      data
    );
    if (response.data.success == true) {
      toast.success(response.data.message);
      navigate("/");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Create Contact failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const getAllContact = async (setAllContact, setLoading) => {
  try {
    const response = await axiosInstance.get(Contact_ENDPOINTS.getAllContact);
    if (response.data.success == true) {
      toast.success(response.data.message);
      setAllContact(response.data.data);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Create Contact failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const deleteContact = async (id) => {
  try {

    const response = await axiosInstance.delete(Contact_ENDPOINTS.deleteContact(id));
    if (response.data.success == true) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Delete Contact failed. Please try again."
    );
  } 
};

