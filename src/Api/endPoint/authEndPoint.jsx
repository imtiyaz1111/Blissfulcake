import { baseURL } from "../axiosIntance";

const AUTH_ENDPOINTS = {
  LOGIN: `${baseURL}/api/user/login`,
  REGISTER: `${baseURL}/api/user/register`,
  Logout: `${baseURL}/api/user/logout`,
  VERIFY_MAIL: `${baseURL}/api/user/verify`,
  FORGOT_PASSWORD: `${baseURL}/api/user/forgot-password`,
  VERIFY_OTP: (email) => `${baseURL}/api/user/verify-otp/${email}`, 
  RESEND_OTP: `${baseURL}/api/user/resend-otp`,
  CHANGE_PASSWORD:(email) => `${baseURL}/api/user/change-password/${email}`,
  UPDATE_PASSWORD: `${baseURL}/api/user/update-password`,

};

export default AUTH_ENDPOINTS;