// pages/popup/Dashboard.js
import React, { useState } from "react";
import styles from "./styles.module.css";
import Profile from "./Profile";

const Dashboard = ({ selectedOption }) => {
  return (
    <div>
      <h2>Dashboard - {selectedOption}</h2>
      {selectedOption === "profile" && <Profile />}
      {/* Add other options/components as needed */}
    </div>
  );
};

export default Dashboard;
