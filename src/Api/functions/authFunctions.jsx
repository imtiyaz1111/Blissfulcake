import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axiosInstance from "../axiosIntance";
import AUTH_ENDPOINTS from "../endPoint/authEndpoint";

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

// register user
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
      // ✅ Remove auth cookie
      Cookies.remove("auth");

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


// verify email
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
      return true; // ✅ success
    } else {
      throw new Error(response.data.message || "Verification failed");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Email verification failed. Please try again."
    );
    throw error; // ✅ so component can catch
  }
};