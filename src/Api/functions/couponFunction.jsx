import axiosInstance from "../axiosIntance";
import Coupon_ENDPOINTS from "../endPoint/couponEndPoint";
import { toast } from "react-toastify";

// Get All Coupons
export const getAllCoupons = async (setCoupons, setLoading, token) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(Coupon_ENDPOINTS.getAllCoupons, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data?.data) {
      setCoupons(res.data.data);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch coupons");
  } finally {
    setLoading(false);
  }
};

// Get All by id Coupons
export const getCouponById = async (id, token) => {
  try {
    const res = await axiosInstance.get(Coupon_ENDPOINTS.getCouponById(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch coupons");
  }
};

// Create Coupon
export const createCoupon = async (formData, navigate, setLoading, token) => {
  try {
    setLoading(true);
    const response = await axiosInstance.post(
      Coupon_ENDPOINTS.CREATECOUPON,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/coupon/manage");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create coupon");
  } finally {
    setLoading(false);
  }
};

// Update Coupon
export const updateCoupon = async (
  id,
  updatedData,
  token,
  setLoading,
  navigate
) => {
  try {
    setLoading(true);
    const response = await axiosInstance.put(
      Coupon_ENDPOINTS.UPDATECOUPON(id),
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/coupon/manage");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update coupon");
  } finally {
    setLoading(false);
  }
};

// Delete Coupon
export const deleteCoupon = async (id, token, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.delete(
      Coupon_ENDPOINTS.DELETECOUPON(id),
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
    toast.error(error.response?.data?.message || "Failed to delete coupon");
  } finally {
    setLoading(false);
  }
};

// Verify Coupon (for checkout usage)
export const verifyCoupon = async (codeObj, setDiscount, setLoading, token) => {
  try {
    setLoading(true);
    const response = await axiosInstance.post(
      Coupon_ENDPOINTS.VERIFYCOUPON,
      codeObj, // { code, totalAmount }
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);

      // ✅ Apply discount amount directly from backend
      const discount = response.data.discountAmount || 0;
      setDiscount(discount);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid coupon code");
  } finally {
    setLoading(false);
  }
};
