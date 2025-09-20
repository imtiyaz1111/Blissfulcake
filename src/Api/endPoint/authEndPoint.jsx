import { baseURL } from "../axiosIntance";

const AUTH_ENDPOINTS = {
  LOGIN: `${baseURL}/api/user/login`,
  REGISTER: `${baseURL}/api/user/register`,
  Logout: `${baseURL}/api/user/logout`,
  VERIFY_MAIL: `${baseURL}/api/user/verify`,
};

export default AUTH_ENDPOINTS;