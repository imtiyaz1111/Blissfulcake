import { baseURL } from "../axiosIntance";

const PRODUCT_ENDPOINTS = {
  GET_ALL_PRODUCT: `${baseURL}/api/products/`,
  GET_SINGLE_PRODUCT: (id) => `${baseURL}/api/products/${id}`,
  CREATE_PRODUCT: `${baseURL}/api/products/create`,
  UPDATE_PRODUCT: (id) => `${baseURL}/api/products/update/${id}`,
  DELETE_PRODUCT: (id) => `${baseURL}/api/products/update/${id}`,
  REVIEW_PRODUCT: (id) => `${baseURL}/api/products/reviews/${id}`,
};

export default PRODUCT_ENDPOINTS;
