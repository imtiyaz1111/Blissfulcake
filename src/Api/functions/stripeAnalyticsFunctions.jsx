import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import STRIPE_ANALYTICS_ENDPOINTS from "../endPoint/stripeAnalyticsEndPoint";

// ✅ 1. Get Total Revenue
export const getTotalRevenue = async (setRevenue, token, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      STRIPE_ANALYTICS_ENDPOINTS.getTotalRevenue,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data.success === true) {
      setRevenue(res.data.totalRevenue);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch total revenue."
    );
  } finally {
    setLoading(false);
  }
};

// ✅ 2. Get Revenue by Period (day, week, month)
export const getRevenueByPeriod = async (period, setRevenue, token, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      STRIPE_ANALYTICS_ENDPOINTS.getRevenueByPeriod(period),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data.success === true) {
      setRevenue(res.data.data);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch revenue by period."
    );
  } finally {
    setLoading(false);
  }
};

// ✅ 3. Get Average Order Value
export const getAverageOrderValue = async (setAvgValue, token, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      STRIPE_ANALYTICS_ENDPOINTS.getAverageOrderValue,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data.success === true) {
      setAvgValue(res.data.data);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch average order value."
    );
  } finally {
    setLoading(false);
  }
};

// ✅ 4. Get Transaction Stats (success, failed, refunded)
export const getTransactionStats = async (setStats, token, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      STRIPE_ANALYTICS_ENDPOINTS.getTransactionStats,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data.success === true) {
      setStats(res.data.data);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch transaction stats."
    );
  } finally {
    setLoading(false);
  }
};


