import { baseURL } from "../axiosIntance";

const HomeBanner_ENDPOINTS = {
  getAllHomeBanner: `${baseURL}/api/homebanner/`,
  // protected + admin EndPoint
  UPLOADBANNER: `${baseURL}/api/homebanner/upload/`,
  DELETEBARNNER: (id) => `${baseURL}/api/homebanner/${id}`,
};

export default HomeBanner_ENDPOINTS;
