        import React, { useState } from 'react';
import doubnut from "../../assets/authImg/doubnut.png"
import cupcake from "../../assets/authImg/cupcake.png"
import signup_image from "../../assets/authImg/signup.jpg"
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Signup successful!', formData);
      alert('Signup successful! Welcome to our sweet community! 🍰');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="signup-container">
      {/* Decorative images */}
      <img src={cupcake} alt="Decorative cupcake" className="decorative-cupcake" />
      <img src={doubnut} alt="Decorative donut" className="decorative-donut" />

      <div className="form-area">
        <img src={signup_image} className='signup-image' alt="signup-image" />
        <div className="signup-form-wrapper">
            <h1 className="form-title">Sweet Signup</h1>
            <p className="form-subtitle">Join our delicious community!</p>

            <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
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

            {/* Password */}
            <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Create a password"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
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
