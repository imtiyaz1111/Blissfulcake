import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import redcake from "../../assets/authImg/redcake.png";
import lovecake from "../../assets/authImg/lovecake.png";
import login_image from "../../assets/authImg/login.jpg";
import { login } from "../../Api/functions/authFunctions";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Load saved email if "Remember me" was checked
  useEffect(() => {
    const savedEmail = Cookies.get("rememberedEmail");
    const remember = Cookies.get("rememberMe");
    if (remember === "true" && savedEmail) {
      setFormData((prevData) => ({ ...prevData, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Remember me functionality
    if (rememberMe) {
      Cookies.set("rememberedEmail", formData.email, { expires: 7 });
      Cookies.set("rememberMe", "true", { expires: 7 });
    } else {
      Cookies.remove("rememberedEmail");
      Cookies.remove("rememberMe");
    }

    const data = { email: formData.email, password: formData.password };
    login(data, navigate, setLoading, setAuth); // ✅ FIXED (removed extra auth)
  };

  return (
    <div className="login-container">
      <div className="form-area">
        {/* Left side image */}
        <img src={login_image} className="login-image" alt="login" />

        {/* Form */}
        <div className="login-form-wrapper">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Login to continue</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="login-form-group">
              <label className="login-label">Email</label>
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password with toggle */}
            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div className="password-wrapper" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Forgot Password */}
            <p className="forgot-link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>

            {/* Remember me */}
            <div className="mb-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="signup-link">
            Don’t have an account? <Link to="/register">Sign up</Link>
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
