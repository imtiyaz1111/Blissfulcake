import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, allowedRoles }) => {
  // Get auth cookie
  const Cookie = Cookies.get("auth");
  const authData = Cookie ? JSON.parse(Cookie) : null;

  const token = authData?.token;
  const role = authData?.user?.role; 

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    const toastId = "login-warning";
    toast.warning("Please log in to access this page", { toastId });
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect based on role
    if (role === "user") return <Navigate to="/" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    // return <Navigate to="/" replace />; // fallback
  }

  return children;
};

export default PrivateRoute;
