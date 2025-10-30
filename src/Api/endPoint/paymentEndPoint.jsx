import { baseURL } from "../axiosIntance";

const PAYMENT_ENDPOINTS = {
  createCheckoutSession: `${baseURL}/api/payment/create-checkout-session`,
};

export default PAYMENT_ENDPOINTS;
