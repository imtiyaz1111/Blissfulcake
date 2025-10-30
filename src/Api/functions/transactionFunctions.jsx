// src/Api/functions/transactionFunctions.js

import axiosInstance from "../axiosIntance";
import { toast } from "react-toastify";
import TRANSACTION_ENDPOINTS from "../endPoint/transactionEndPoint";

// ✅ Get all transactions (Admin)
export const getAllTransactions = async (setTransactions, token, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(TRANSACTION_ENDPOINTS.getAllTransactions, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success === true) {
      setTransactions(res.data.data);
    } else {
      toast.error("Failed to fetch transactions.");
    }
  } catch (error) {
    console.error("Error fetching all transactions:", error);
    toast.error(error.response?.data?.message || "Failed to fetch transactions.");
  } finally {
    setLoading(false);
  }
};

// ✅ Get user transactions
export const getUserTransactions = async (setTransactions, token, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(TRANSACTION_ENDPOINTS.getUserTransactions, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success === true) {
      setTransactions(res.data.data);
    } else {
      toast.error("Failed to fetch your transactions.");
    }
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    toast.error(error.response?.data?.message || "Failed to fetch your transactions.");
  } finally {
    setLoading(false);
  }
};
