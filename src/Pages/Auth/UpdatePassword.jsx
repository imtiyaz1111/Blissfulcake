import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import chococake from "../../assets/authImg/chococake.png";
import comcom from "../../assets/authImg/comcom.png";
import password_image from "../../assets/authImg/password-image.jpg";
import { toast } from "react-toastify";
import { updatePassword } from "../../Api/functions/authFunctions";
import { useAuth } from "../../context/AuthProvider";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [auth]=useAuth()
  const token=auth?.token;

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const newData = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };
    updatePassword(newData, navigate, setLoading,token);
  };

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
          <h1 className="changepassword-title">Update Password</h1>
          <p className="changepassword-subtitle">
            Update your password securely
          </p>

          <form onSubmit={handleSubmit}>
            <div className="changepassword-form-group">
              <label className="changepassword-label">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="changepassword-input"
                placeholder="Enter your old password"
              />
            </div>

            <div className="changepassword-form-group">
              <label className="changepassword-label">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="changepassword-input"
                placeholder="Enter new password"
              />
            </div>

            <div className="changepassword-form-group">
              <label className="changepassword-label">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="changepassword-input"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              className="changepassword-button"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

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

export default UpdatePassword;
