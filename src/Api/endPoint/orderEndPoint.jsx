// src/Api/endPoint/orderEndPoint.js
import { baseURL } from "../axiosIntance";

const ORDER_ENDPOINTS = {
  // 🛒 Create new order
  createOrder: `${baseURL}/api/order/create`,

  // 👤 Get all orders for logged-in user
  getUserOrders: `${baseURL}/api/order/user`,

  // 🔍 Get order details by ID
  getOrderById: (id) => `${baseURL}/api/order/${id}`,

  // 👑 Admin: Get all orders
  getAllOrders: `${baseURL}/api/order/all`,

  // 👑 Admin: Update order status
  updateOrderStatus: (id) => `${baseURL}/api/order/update/${id}`,
};

export default ORDER_ENDPOINTS;
