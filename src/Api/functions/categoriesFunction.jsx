import axiosInstance from "../axiosIntance";
import Category_ENDPOINTS from "../endPoint/categoriesEndPoint";

export const getAllCategories = async (setCategoryData) => {
  try {
    const res = await axiosInstance.get(Category_ENDPOINTS.getAllCategories);
    if (res) {
      setCategoryData(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
