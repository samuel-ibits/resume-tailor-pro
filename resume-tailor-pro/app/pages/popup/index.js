// pages/popup/index.js
import React, { useState } from "react";
import styles from "./styles.module.css";
import ListJobs from "./ListJobs";
import AdjustCV from "./AdjustCV";
import Dashboard from "./Dashboard";

const Popup = () => {
  const [currentPage, setCurrentPage] = useState("listJobs");
  const [dashboardOption, setDashboardOption] = useState("profile");

  const renderPage = () => {
    switch (currentPage) {
      case "listJobs":
        return <ListJobs />;
      case "adjustCV":
        return <AdjustCV />;
      case "dashboard":
        return <Dashboard selectedOption={dashboardOption} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>ResumeTailorPro</h1>
      <ul className={styles.options}>
        <li>
          <button onClick={() => setCurrentPage("listJobs")}>List Jobs</button>
        </li>
        <li>
          <button onClick={() => setCurrentPage("adjustCV")}>Adjust CV</button>
        </li>
        <li>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Dashboard</button>
            <div className={styles["dropdown-content"]}>
              <button onClick={() => setDashboardOption("profile")}>
                Profile
              </button>
              <button onClick={() => setDashboardOption("myResumes")}>
                My Resumes
              </button>
              <button onClick={() => setDashboardOption("savedJobs")}>
                Saved Jobs
              </button>
            </div>
          </div>
        </li>
      </ul>
      {renderPage()}
    </div>
  );
};

export default Popup;
