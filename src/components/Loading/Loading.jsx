import React from "react";
import "./Loading.css";
import logo from "../../assets/blissfulllogo.png"; // adjust path

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="logo-wrapper">
        <img src={logo} alt="Blissful Bites Logo" className="loading-logo" />
        <div className="pulse-circle"></div>
      </div>
      <h2 className="loading-text">Blissful Bites</h2>
      <p className="loading-dots">Loading<span>.</span><span>.</span><span>.</span></p>
    </div>
  );
};

export default Loading;
