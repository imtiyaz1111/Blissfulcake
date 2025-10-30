// src/Api/endPoint/transactionEndPoint.js

import { baseURL } from "../axiosIntance";

const TRANSACTION_ENDPOINTS = {
  getAllTransactions: `${baseURL}/api/transactions/all`, // admin only
  getUserTransactions: `${baseURL}/api/transactions/user`, // logged-in user
};

export default TRANSACTION_ENDPOINTS;
