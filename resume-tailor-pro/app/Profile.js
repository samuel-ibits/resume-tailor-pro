// pages/popup/Profile.js
"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    // Fetch profile data (replace with actual API endpoint)
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Replace the API URL with your actual endpoint
      const response = await fetch("/api/profile");
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {Object.keys(profileData).length > 0 ? (
        <div>
          <p>
            <strong>Name:</strong> {profileData.name}
          </p>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          <p>
            <strong>Job Category:</strong> {profileData.jobCategory}
          </p>
          <p>
            <strong>Current Role:</strong> {profileData.currentRole}
          </p>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default Profile;
