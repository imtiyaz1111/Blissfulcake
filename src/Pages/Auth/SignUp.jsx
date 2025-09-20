import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../../Api/functions/authFunctions"; 

import doubnut from "../../assets/authImg/doubnut.png";
import cupcake from "../../assets/authImg/cupcake.png";
import signup_image from "../../assets/authImg/signup.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.number)) {
      newErrors.number = 'Phone number must be 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newDara={
      username:formData.username,
      email:formData.email,
      number:formData.number,
      password:formData.password
    }
    registerUser(newDara, navigate, setLoading);
   
  };

  return (
    <div className="signup-container">
      {/* Decorative images */}
      <img src={cupcake} alt="Decorative cupcake" className="decorative-cupcake" />
      <img src={doubnut} alt="Decorative donut" className="decorative-donut" />

      <div className="form-area">
        <img src={signup_image} className='signup-image' alt="signup" />
        <div className="signup-form-wrapper">
          <h1 className="form-title">Sweet Signup</h1>
          <p className="form-subtitle">Join our delicious community!</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="number" className="form-label">Phone Number</label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your 10-digit phone number"
              />
              {errors.number && <span className="error-text">{errors.number}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-wrapper" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer"
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
