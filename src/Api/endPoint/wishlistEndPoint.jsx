import { baseURL } from "../axiosIntance";

const WISHLIST_ENDPOINTS = {
  getAllWishlist: `${baseURL}/api/wishlist`,
  addWishlist: `${baseURL}/api/wishlist/add`,
  deleteWishlist: (id) => `${baseURL}/api/wishlist/remove/${id}`,
};

export default WISHLIST_ENDPOINTS;
