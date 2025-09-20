import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./layout/Layout";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import Aboutus from "./Pages/Aboutus";
import Gallery from "./Pages/Gallery";
import Contactus from "./Pages/Contactus";
import Blogs from "./Pages/Blog/Blogs";
import Products from "./Pages/Product/Products";
import AdminLayout from "./Admin/Layouts/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard";
import AllBannerList from "./Admin/Pages/Banner/AllBannerList";
import AddBanner from "./Admin/Pages/Banner/AddBanner";
import AllGalleryList from "./Admin/Pages/Gallery/AllGalleryList";
import AddGallery from "./Admin/Pages/Gallery/AddGallery";
import Signup from "./Pages/Auth/SignUp";
import VerifyOTP from "./Pages/Auth/VerifyOtp";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ChangePassword from "./Pages/Auth/ChangePassword";
import Login from "./Pages/Auth/Login";
import AllReviewImgList from "./Admin/Pages/ReviewImg/AllReviewImgList";
import AddReveiwImg from "./Admin/Pages/ReviewImg/AddReveiwImg";
import CategoryList from "./Admin/Pages/Category/CategoryList";
import AddCategory from "./Admin/Pages/Category/AddCategory";
import UpdateCategory from "./Admin/Pages/Category/UpdateCategory";
import UsersList from "./Admin/Pages/User/UsersList";
import Profile from "./Pages/Profile";
import VerifyEmail from "./Pages/Auth/VerifyEmail";

const App = () => {
  const publicRoute = [
    { path: "/", element: <Home /> },
    { path: "/aboutus", element: <Aboutus /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/contactus", element: <Contactus /> },
    { path: "/blog", element: <Blogs /> },
    { path: "/shop", element: <Products /> },
  ];

  const authRoute = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Signup /> },
    { path: "/verify-otp", element: <VerifyOTP /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/change-password", element: <ChangePassword /> },
    { path: "/verify-email/:token", element: <VerifyEmail /> },
  ];

  const privateRoute = [
    {
      path: "/profile",
      element: <Profile />,
      allowedRoles: ["user", "admin"],
    },
  ];

  const adminRoute = [
    { path: "/admin/dashboard", element: <Dashboard />, allowedRoles: ["admin"] },
    { path: "/banner/manage", element: <AllBannerList />, allowedRoles: ["admin"] },
    { path: "/banner/add", element: <AddBanner />, allowedRoles: ["admin"] },
    { path: "/gallery/manage", element: <AllGalleryList />, allowedRoles: ["admin"] },
    { path: "/gallery/add", element: <AddGallery />, allowedRoles: ["admin"] },
    { path: "/review/manage", element: <AllReviewImgList />, allowedRoles: ["admin"] },
    { path: "/review/add", element: <AddReveiwImg />, allowedRoles: ["admin"] },
    { path: "/category/manage", element: <CategoryList />, allowedRoles: ["admin"] },
    { path: "/category/add", element: <AddCategory />, allowedRoles: ["admin"] },
    { path: "/category/update", element: <UpdateCategory />, allowedRoles: ["admin"] },
    { path: "/user/manage", element: <UsersList />, allowedRoles: ["admin"] },
  ];

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        {authRoute.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}

        {/* Public Layout Routes */}
        <Route element={<Layout />}>
          {publicRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}

          {/* User Private Routes */}
          {privateRoute.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={
                <PrivateRoute allowedRoles={item.allowedRoles}>
                  {item.element}
                </PrivateRoute>
              }
            />
          ))}
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          {adminRoute.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={
                <PrivateRoute allowedRoles={item.allowedRoles}>
                  {item.element}
                </PrivateRoute>
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
