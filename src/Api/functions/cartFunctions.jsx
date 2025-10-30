import axiosInstance from "../axiosIntance";
import CART_ENDPOINTS from "../endPoint/cartEndPoint";
import { toast } from "react-toastify";

// ✅ Add product to cart
export const addToCart = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      CART_ENDPOINTS.addToCart,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.cart; // Returns the full cart object
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to add product to cart."
    );
  }
};

// ✅ Get user cart
export const getCart = async (setCartData, token) => {
  try {
    const response = await axiosInstance.get(CART_ENDPOINTS.getCart, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      setCartData(response.data.cart); 
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch cart data.");
  }
};

// ✅ Update product quantity in cart
export const updateCartItem = async (data, token) => {
  try {
    const response = await axiosInstance.put(
      CART_ENDPOINTS.updateCartItem,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.cart; // Returns the full cart object
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update cart item."
    );
  }
};

// ✅ Remove product from cart
export const removeFromCart = async (productId, token) => {
  try {
    const response = await axiosInstance.delete(
      CART_ENDPOINTS.removeFromCart(productId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.cart; // Returns the full cart object
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to remove product from cart."
    );
  }
};

// ✅ Clear entire cart
export const clearCart = async (token) => {
  try {
    const response = await axiosInstance.delete(CART_ENDPOINTS.clearCart, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success==true) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to clear the cart."
    );
  }
};