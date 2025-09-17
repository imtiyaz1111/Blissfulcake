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

const App = () => {
  const publicRoute = [
    { path: "/", element: <Home /> },
    { path: "/aboutus", element: <Aboutus /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/contactus", element: <Contactus /> },
    { path: "/blog", element: <Blogs /> },
    { path: "/shop", element: <Products /> },
  ];

  const privateRoute = [];

  const adminRoute = [
    { path: "admin/dashboard", element: <Dashboard /> },
    { path: "banner/manage", element: <AllBannerList /> },
    { path: "banner/add", element: <AddBanner /> },
    { path: "gallery/manage", element: <AllGalleryList /> },
    { path: "gallery/add", element: <AddGallery /> },
  ];
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            {publicRoute.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}

            {/* Private Routes */}
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
          {/* Admin Route */}
          <Route element={<AdminLayout />}>
            {adminRoute.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={
                  item.element
                  // <PrivateRoute allowedRoles={["admin"]}>
                  //   {item.element}
                  // </PrivateRoute>
                }
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
