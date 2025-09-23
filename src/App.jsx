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
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import AllProductList from "./Admin/Pages/Product/AllProductList";
import AddProduct from "./Admin/Pages/Product/AddProduct";

const App = () => {
  // const [loading, setLoading] = useState(true);
  //  useEffect(() => {
  //   // simulate data loading
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);
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
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/verify-otp/:email", element: <VerifyOTP /> },
    { path: "/change-password/:email", element: <ChangePassword /> },
    { path: "/verify-email/:token", element: <VerifyEmail /> },
    { path: "/update-password", element: <UpdatePassword /> },
  ];

  const privateRoute = [
    {
      path: "/profile",
      element: <Profile />,
    },
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
    { path: "/category/update", element: <UpdateCategory /> },
    { path: "/user/manage", element: <UsersList /> },
    { path: "/product/manage", element: <AllProductList /> },
    { path: "/product/add", element: <AddProduct /> },
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
                <PrivateRoute allowedRoles={["user"]}>
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
