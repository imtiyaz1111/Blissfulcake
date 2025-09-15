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

const App = () => {
  const publicRoute = [{ path: "/", element: <Home /> },
    { path: "/aboutus", element: <Aboutus /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/contactus", element: <Contactus /> },
    { path: "/blog", element: <Blogs /> },
    { path: "/shop", element: <Products /> },
  ];

  const privateRoute = [];

  const adminRoute = [];
  return (
    <>
      <Router>
        <Layout>
          <Routes>
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

            {/* Admin Route */}
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
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
