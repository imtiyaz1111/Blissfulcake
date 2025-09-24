import { baseURL } from "../axiosIntance";

const REVIEWIMG_ENDPOINTS = {
  getAllReview: `${baseURL}/api/reviewimg/`,
  // protected + admin EndPoint
  UPLOADREVIEWIMG: `${baseURL}/api/reviewimg/upload/`,
  DELETEBREVIEWIMG: (id) => `${baseURL}/api/reviewimg/${id}`,
};

export default REVIEWIMG_ENDPOINTS;
