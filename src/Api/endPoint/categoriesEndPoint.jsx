import { baseURL } from "../axiosIntance";

const Category_ENDPOINTS = {
  getAllCategories: `${baseURL}/api/categories/`,
  createCategories: `${baseURL}/api/categories/create`,
  getSingleCategories: (id) => `${baseURL}/api/categories/${id}`,
  deleteCategories: (id) => `${baseURL}/api/categories/${id}`,
  updateCategories: (id) => `${baseURL}/api/categories/${id}`,
};

export default Category_ENDPOINTS;
