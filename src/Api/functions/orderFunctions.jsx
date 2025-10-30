// src/Api/functions/orderFunctions.js

import axiosInstance from "../axiosIntance";
import { toast } from "react-toastify";
import ORDER_ENDPOINTS from "../endPoint/orderEndPoint";

// ✅ Create Order
export const createOrder = async (payload, token, setLoading, navigate) => {
	try {
		setLoading(true);
		const res = await axiosInstance.post(ORDER_ENDPOINTS.createOrder, payload, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (res.data.success === true) {
			toast.success(res.data.message || "Order placed successfully");
			navigate("/profile/orders");
		} else {
			toast.error(res.data.message || "Failed to place order");
		}

		return res.data;
	} catch (error) {
		toast.error(
			error.response?.data?.message || "Failed to place order. Please try again."
		);
		return null;
	} finally {
		setLoading(false);
	}
};

// ✅ Get Orders for a user
export const getUserOrders = async (setOrders, token, setLoading) => {
	try {
		setLoading(true);
		const res = await axiosInstance.get(ORDER_ENDPOINTS.getUserOrders, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (res.data.success === true) {
			setOrders(res.data.data);
		}
	} catch (error) {
		toast.error(error.response?.data?.message || "Failed to fetch orders.");
	} finally {
		setLoading(false);
	}
};

// ✅ Get All Orders (Admin)
export const getAllOrders = async (setOrders, token, setLoading) => {
	try {
		setLoading(true);
		const res = await axiosInstance.get(ORDER_ENDPOINTS.getAllOrders, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (res.data.success === true) {
			setOrders(res.data.data);
		}
	} catch (error) {
		toast.error("Failed to fetch all orders");
	} finally {
		setLoading(false);
	}
};

// ✅ Get Order by ID
export const getOrderById = async (id, token, setOrder, setLoading) => {
	try {
		setLoading(true);
		const res = await axiosInstance.get(ORDER_ENDPOINTS.getOrderById(id), {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (res.data.success === true) {
			setOrder(res.data.data);
		}
	} catch (error) {
		toast.error(
			error.response?.data?.message || "Failed to fetch order details."
		);
	} finally {
		setLoading(false);
	}
};

// ✅ ADDED: Update Order Status (Admin)
export const updateOrderStatus = async (id, status, token, setLoading) => {
	try {
		setLoading(true);
		const res = await axiosInstance.put(
			ORDER_ENDPOINTS.updateOrderStatus(id),
			{ orderStatus: status },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		if (res.data.success === true) {
			toast.success(res.data.message || "Order status updated successfully");
			return res.data.order; // Return updated order object
		} else {
			toast.error(res.data.message || "Failed to update order status");
			return null;
		}
	} catch (error) {
		toast.error(
			error.response?.data?.message || "Failed to update order status. Please try again."
		);
		return null;
	} finally {
		setLoading(false);
	}
};