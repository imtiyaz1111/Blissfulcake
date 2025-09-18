import React from "react";
import { Link } from "react-router-dom";
import redcake from "../../assets/authImg/redcake.png";
import lovecake from "../../assets/authImg/lovecake.png";
import login_image from "../../assets/authImg/login.jpg";

const Login = () => {
  return (
    <div className="login-container">
      <div className="form-area">
        {/* Left side image */}
        <img src={login_image} className="login-image" alt="login" />

        {/* Form */}
        <div className="login-form-wrapper">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Login to continue</p>

          <div className="login-form-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="login-form-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot password link */}
          <p className="forgot-link">
            <Link to="/forgot_password">Forgot Password?</Link>
          </p>

          <button className="login-button">Login</button>

          <p className="signup-link">
            Don’t have an account? <Link to="/">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <img src={redcake} alt="cupcake" className="login-decorative-cupcake" />
      <img src={lovecake} alt="donut" className="login-decorative-donut" />
    </div>
  );
};

export default Login;
