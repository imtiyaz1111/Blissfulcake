
import PAYMENT_ENDPOINTS from "../endPoint/paymentEndPoint";
import axiosInstance from "../axiosIntance";

export const createCheckoutSession = async (cartItems, token,email) => {
  try {
    const successUrl = `${window.location.origin}/checkout-success`;
    const cancelUrl = `${window.location.origin}/checkout-cancel`;

    const { data } = await axiosInstance.post(
      PAYMENT_ENDPOINTS.createCheckoutSession,
      {
        cartItems,
        userEmail: `${email}`, 
        successUrl,
        cancelUrl,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch (error) {
    console.error("Checkout session error:", error);
    throw error;
  }
};
