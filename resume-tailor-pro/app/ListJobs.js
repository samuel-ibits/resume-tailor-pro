// pages/popup/ListJobs.js
"use client"
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const ListJobs = () => {
 
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    // Fetch jobs based on the search term and date filter
    fetchJobs();
  }, [searchTerm, dateFilter]);

  const fetchJobs = async () => {
    // Fetch jobs from your API based on search term and date filter
    // Replace the API URL with your actual endpoint
    const apiUrl = `/api/jobs?search=${searchTerm}&dateFilter=${dateFilter}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div>
      <h1>ResumeTailorPro</h1>
      <div>
        <input
          type="text"
          placeholder="Search jobs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Dates</option>
          <option value="lastWeek">Last Week</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className={styles.jobList}>
          {jobs.map((job, index) => (
            <li key={index}>
              <h2>{job.position}</h2>
              <p>{job.salary}</p>
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



export default ListJobs;
