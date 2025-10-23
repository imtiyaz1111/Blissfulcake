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
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import AllProductList from "./Admin/Pages/Product/AllProductList";
import AddProduct from "./Admin/Pages/Product/AddProduct";
import UpdateProduct from "./Admin/Pages/Product/UpdateProduct";
import ContactList from "./Admin/Pages/contact/ContactList";
import CartPage from "./Pages/CartPages/CartPage";
import ProductDetailsPage from "./Pages/Product/ProductDetailsPage";
import ProductByCategory from "./Pages/Product/ProductByCategory";
import WishlistPage from "./Pages/WishlistPage/WishlistPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import OrderList from "./Pages/ProfilePage/Order/OrderList";
import TransactionList from "./Pages/ProfilePage/Payements/TransactionList";
import AddCoupon from "./Admin/Pages/Coupon/AddCoupon";
import AllCouponList from "./Admin/Pages/Coupon/AllCouponList";
import UpdateCoupon from "./Admin/Pages/Coupon/UpdateCoupon";
import MyProfile from "./Pages/ProfilePage/AccountSettings/MyProfile";
import EditProfile from "./Pages/ProfilePage/AccountSettings/EditProfile";

const App = () => {
  const publicRoute = [
    { path: "/", element: <Home /> },
    { path: "/aboutus", element: <Aboutus /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/contactus", element: <Contactus /> },
    { path: "/blog", element: <Blogs /> },
    { path: "/shop", element: <Products /> },
    { path: "/shop/:category", element: <ProductByCategory /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/wishlist", element: <WishlistPage /> },
    { path: "/product/:id", element: <ProductDetailsPage /> },
  ];

  const authRoute = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Signup /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/verify-otp/:email", element: <VerifyOTP /> },
    { path: "/change-password/:email", element: <ChangePassword /> },
    { path: "/verify-email/:token", element: <VerifyEmail /> },
    { path: "/update-password", element: <UpdatePassword /> },
  ];

  const adminRoute = [
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/banner/manage", element: <AllBannerList /> },
    { path: "/banner/add", element: <AddBanner /> },
    { path: "/gallery/manage", element: <AllGalleryList /> },
    { path: "/gallery/add", element: <AddGallery /> },
    { path: "/review/manage", element: <AllReviewImgList /> },
    { path: "/review/add", element: <AddReveiwImg /> },
    { path: "/category/manage", element: <CategoryList /> },
    { path: "/category/add", element: <AddCategory /> },
    { path: "/category/update/:id", element: <UpdateCategory /> },
    { path: "/user/manage", element: <UsersList /> },
    { path: "/product/manage", element: <AllProductList /> },
    { path: "/product/add", element: <AddProduct /> },
    { path: "/product/update/:id", element: <UpdateProduct /> },
    { path: "/contact/manage", element: <ContactList /> },
    { path: "/coupon/add", element: <AddCoupon /> },
    { path: "/coupon/manage", element: <AllCouponList /> },
    { path: "/coupon/update/:id", element: <UpdateCoupon /> },
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

          {/* Protected User Routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <ProfilePage />
              </PrivateRoute>
            }
          >
            <Route path="orders" element={<OrderList />} />
            <Route path="transactions" element={<TransactionList />} />
            <Route path="settings/myprofile" element={<MyProfile />} />
            <Route path="settings/edit" element={<EditProfile />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          {adminRoute.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={
                <PrivateRoute allowedRoles={["admin"]}>
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
