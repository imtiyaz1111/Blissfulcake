import { baseURL } from "../axiosIntance";

const PRODUCT_ENDPOINTS = {
  GET_ALL_PRODUCT: `${baseURL}/api/products/`,
  GET_ALL_PRODUCT_BY_CATEGORY: (category) =>
    `${baseURL}/api/products/category/${category}`,
  GET_SINGLE_PRODUCT: (id) => `${baseURL}/api/products/${id}`,
  CREATE_PRODUCT: `${baseURL}/api/products/create`,
  UPDATE_PRODUCT: (id) => `${baseURL}/api/products/update/${id}`,
  DELETE_PRODUCT: (id) => `${baseURL}/api/products/delete/${id}`,
  REVIEW_PRODUCT: (id) => `${baseURL}/api/products/reviews/${id}`,
  COMMENT_STATUS_PRODUCT: (proId, revId) =>
    `${baseURL}/api/products/reviews/${proId}/${revId}/status`,
  REPLY_COMMENT_PRODUCT: (proId, revId) =>
    `${baseURL}/api/products/reviews/${proId}/${revId}/reply`,
};

export default PRODUCT_ENDPOINTS;
