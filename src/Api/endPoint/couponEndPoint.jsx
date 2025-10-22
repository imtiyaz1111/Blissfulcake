import { baseURL } from "../axiosIntance";

const Coupon_ENDPOINTS = {
  getAllCoupons: `${baseURL}/api/coupon/`,
  // protected + admin endpoints
  getCouponById: (id) => `${baseURL}/api/coupon/${id}`,
  CREATECOUPON: `${baseURL}/api/coupon/create/`,
  DELETECOUPON: (id) => `${baseURL}/api/coupon/${id}`,
  UPDATECOUPON: (id) => `${baseURL}/api/coupon/${id}`,
  VERIFYCOUPON: `${baseURL}/api/coupon/verify/`,
};

export default Coupon_ENDPOINTS;
