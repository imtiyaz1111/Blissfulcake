import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, allowedRoles }) => {
  const authCookie = Cookies.get("auth");

  let isAuthenticated = false;
  let userRole = null;

  if (authCookie) {
    try {
      const parsedAuth = JSON.parse(authCookie);
      isAuthenticated = !!parsedAuth.token;
      userRole = parsedAuth.role; // Make sure role is saved in cookie after login
    } catch (error) {
      console.error("Invalid auth cookie format:", error);
    }
  }

  if (!isAuthenticated) {
    const toastId = "login-warning";
    toast.warning("Please login to access this page", { toastId });
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const toastId = "role-warning";
    toast.error("You do not have permission to access this page", { toastId });
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
