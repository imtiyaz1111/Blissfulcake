import React from "react";
import { Link } from "react-router-dom";
import icecream from "../../assets/authImg/icecream.png";
import coco from "../../assets/authImg/coco.png";
import forgot_image from "../../assets/authImg/forgot-image.jpg"; 



const ForgotPassword = () => {
  return (
    <div className="forgot-container">
      <div className="form-area">
        <img src={forgot_image} className="forgot-image" alt="forgot-password" />
        <div className="forgot-form-wrapper">
          <h1 className="forgot-title">Forgot Password</h1>
          <p className="forgot-subtitle">
            Enter your email to reset your password
          </p>

          <div className="forgot-form-group">
            <label className="forgot-label">Email</label>
            <input
              type="email"
              className="forgot-input"
              placeholder="Enter your email"
            />
          </div>

          <button className="forgot-button">Send Reset Link</button>

          <p className="forgot-login-link">
            Remembered your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <img
        src={icecream}
        alt="cupcake"
        className="forgot-decorative-cupcake"
      />
      <img src={coco} alt="donut" className="forgot-decorative-donut" />
    </div>
  );
};

export default ForgotPassword;
