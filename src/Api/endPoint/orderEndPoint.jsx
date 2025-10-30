// src/Api/endPoint/orderEndPoint.js

import { baseURL } from "../axiosIntance";

const ORDER_ENDPOINTS = {
	createOrder: `${baseURL}/api/order/create`,
	getUserOrders: `${baseURL}/api/order/user`,
	getAllOrders: `${baseURL}/api/order/all`,
	getOrderById: (id) => `${baseURL}/api/order/${id}`,
	// ✅ ADDED: Endpoint for Admin to update order status
	updateOrderStatus: (id) => `${baseURL}/api/order/update/${id}`,
};

export default ORDER_ENDPOINTS;