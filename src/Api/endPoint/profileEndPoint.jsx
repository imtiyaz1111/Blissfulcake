import { baseURL } from "../axiosIntance";

const PROFILE_ENDPOINTS = {
  getProfile: `${baseURL}/api/profile/`,
  updteProfile: `${baseURL}/api/profile/update`,
};

export default PROFILE_ENDPOINTS;
