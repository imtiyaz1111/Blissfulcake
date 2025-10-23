import { baseURL } from "../axiosIntance";

const CART_ENDPOINTS = {
  addToCart: `${baseURL}/api/cart/add`,
  getCart: `${baseURL}/api/cart/`,
  updateCartItem: `${baseURL}/api/cart/update`,
  removeFromCart: (productId) => `${baseURL}/api/cart/remove/${productId}`,
  clearCart: `${baseURL}/api/cart/clear`,
};

export default CART_ENDPOINTS;
