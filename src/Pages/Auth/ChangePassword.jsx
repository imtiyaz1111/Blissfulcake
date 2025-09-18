import React from "react";
import { Link } from "react-router-dom";
import chococake from "../../assets/authImg/chococake.png";
import comcom from "../../assets/authImg/comcom.png";
import password_image from "../../assets/authImg/password-image.jpg";

const ChangePassword = () => {
  return (
    <div className="changepassword-container">
      <div className="form-area">
        {/* Left side image */}
        <img
          src={password_image}
          className="changepassword-image"
          alt="change password"
        />

        {/* Form */}
        <div className="changepassword-form-wrapper">
          <h1 className="changepassword-title">Change Password</h1>
          <p className="changepassword-subtitle">
            Update your password securely
          </p>

          <div className="changepassword-form-group">
            <label className="changepassword-label">Old Password</label>
            <input
              type="password"
              className="changepassword-input"
              placeholder="Enter your old password"
            />
          </div>

          <div className="changepassword-form-group">
            <label className="changepassword-label">New Password</label>
            <input
              type="password"
              className="changepassword-input"
              placeholder="Enter new password"
            />
          </div>

          <div className="changepassword-form-group">
            <label className="changepassword-label">Confirm New Password</label>
            <input
              type="password"
              className="changepassword-input"
              placeholder="Confirm new password"
            />
          </div>

          <button className="changepassword-button">Update Password</button>

          <p className="changepassword-back-link">
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <img
        src={chococake}
        alt="cupcake"
        className="changepassword-decorative-cupcake"
      />
      <img
        src={comcom}
        alt="donut"
        className="changepassword-decorative-donut"
      />
    </div>
  );
};

export default ChangePassword;
