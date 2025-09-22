import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axiosInstance from "../axiosIntance";
import AUTH_ENDPOINTS from "../endPoint/authEndpoint";

// ✅ login user
export const login = async (data, navigate, setLoading, setAuth) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);

    if (response?.data?.success === true) {
      const newAuthData = {
        user: response.data.user,
        token: response.data.accessToken,
      };

      setAuth(newAuthData);

      // ✅ Store user & token in ONE cookie
      Cookies.set("auth", JSON.stringify(newAuthData), { expires: 1 });

      toast.success(response.data.message);
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Login failed. Please check your credentials."
    );
  } finally {
    setLoading(false);
  }
};

// ✅ register user
export const registerUser = async (newData, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, newData);
    if (response.data.success === true) {
      toast.success(response.data.message);
      navigate("/");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

// ✅ logout
export const logOut = async (setAuth, navigate, token) => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.Logout,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success === true) {
      Cookies.remove("auth"); // ✅ Remove auth cookie

      setAuth({
        user: null,
        token: "",
      });

      toast.success(response.data.message);
      navigate("/login");
    }
  } catch (error) {
    console.error("Logout error:", error);
    toast.error(error?.response?.data?.message || "Logout failed");
  }
};

// ✅ verify email
export const verifyEmail = async (token) => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.VERIFY_MAIL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success === true) {
      toast.success(response.data.message);
      return true;
    } else {
      throw new Error(response.data.message || "Verification failed");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Email verification failed. Please try again."
    );
    throw error;
  }
};

// ✅ forgot password
export const forgotPassword = async (data, navigate, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success === true) {
      toast.success(response.data.message);
      navigate(`/verify-otp/${response.data.data.email}`);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Request failed. Please try again."
    );
    throw error;
  } finally {
    setIsLoading(false);
  }
};

// ✅ verify otp
export const verifyOtp = async (data, navigate, setIsLoading, email) => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.VERIFY_OTP(email),
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success === true) {
      toast.success(response.data.message);
      navigate(`/change-password/${email}`);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "OTP verification failed. Please try again."
    );
    throw error;
  } finally {
    setIsLoading(false);
  }
};

// ✅ resend otp
export const resendOtp = async (data) => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.RESEND_OTP,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success === true) {
      toast.success(response.data.message || "OTP resent successfully");
      return true;
    } else {
      toast.error(response.data.message || "Resend failed");
      return false;
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Resend OTP failed. Please try again."
    );
    throw error;
  }
};

// ✅ change password (forgot password flow)
export const changePassword = async (data, navigate, setLoading, email) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.CHANGE_PASSWORD(email),
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success === true) {
      toast.success(response.data.message);
      navigate("/login");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Change password failed. Please try again."
    );
    throw error;
  } finally {
    setLoading(false);
  }
};

// ✅ update password (logged-in user)
export const updatePassword = async (data, navigate, setLoading, token) => {
  setLoading(true);
  try {
    const response = await axiosInstance.put(
      AUTH_ENDPOINTS.UPDATE_PASSWORD,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success === true) {
      toast.success(response.data.message);
      Cookies.remove("auth"); // ✅ clear auth
      navigate("/login");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Update password failed. Please try again."
    );
    throw error;
  } finally {
    setLoading(false);
  }
};

// ✅ get all users (admin only)
export const getAllUsers = async (setAllUserData, setLoading, token) => {
  setLoading(true);
  try {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.GET_ALL_USERS, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success === true) {
      setAllUserData(response.data.users);
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Fetching all users failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
