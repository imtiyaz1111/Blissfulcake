import { baseURL } from "../axiosIntance";

const STRIPE_ANALYTICS_ENDPOINTS = {
  // Get total revenue
  getTotalRevenue: `${baseURL}/api/stripe/total-revenue`,

  // Get revenue by period (day, week, month)
  getRevenueByPeriod: (period) =>
    `${baseURL}/api/stripe/revenue-by-period?period=${period}`,

  // Get average order value
  getAverageOrderValue: `${baseURL}/api/stripe/average-order-value`,

  // Get overall transaction stats (success, failed, canceled)
  getTransactionStats: `${baseURL}/api/stripe/transaction-stats`,
};

export default STRIPE_ANALYTICS_ENDPOINTS;
