// scripts/popup.js

document.addEventListener("DOMContentLoaded", function () {
  // Initial setup
  const screens = document.querySelectorAll(".screen");
  const loginForm = document.getElementById("login-form");
  const jobsScreen = document.getElementById("jobs-screen");
  const profilePage = document.getElementById("profile-page");
  const resumePage = document.getElementById("resume-page");
  const tailorResumePage = document.getElementById("tailor-resume-page");

  // Function to navigate to the Tailor Resume page
  function navigateToTailorResume() {
    showScreen(tailorResumePage);
  }

  // New listener to handle opening the tailor resume section
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "openTailorResumeSection") {
      console.log("got to popup");
      showScreen(tailorResumePage);
    }
  });

  // Tailor Resume button in the popup
  document
    .getElementById("tailor-resume-button")
    .addEventListener("click", navigateToTailorResume);

  // Show login screen by default
  showScreen(loginForm);

  // Navigation buttons
  document.getElementById("skip-login").addEventListener("click", function () {
    showScreen(jobsScreen);
  });

  document
    .getElementById("forgot-password")
    .addEventListener("click", function () {
      showScreen(jobsScreen);
    });

  document
    .getElementById("profile-button")
    .addEventListener("click", function () {
      showScreen(profilePage);
    });

  document
    .getElementById("resumes-button")
    .addEventListener("click", function () {
      showScreen(resumePage);
    });

  document
    .getElementById("tailor-resume-button")
    .addEventListener("click", function () {
      showScreen(tailorResumePage);
    });

  // Profile Page Form Submission
  document
    .getElementById("update-profile-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // Handle profile update logic here
    });

  // Resume Page - Display Resumes Dynamically (Sample)
  function displayResumes() {
    const tbody = document.querySelector("#resume-page tbody");
    const sampleData = [
      { cvName: "CV1", date: "2022-01-01", role: "Software Engineer" },
      { cvName: "CV2", date: "2022-02-01", role: "Data Analyst" },
      // Add more data as needed
    ];

    sampleData.forEach((resume) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${resume.cvName}</td>
        <td>${resume.date}</td>
        <td>${resume.role}</td>
        <td><button class="edit-button">Edit</button></td>
        <td><button class="delete-button">Delete</button></td>
      `;

      const editButton = row.querySelector(".edit-button");
      editButton.addEventListener("click", function () {
        // Handle edit button click logic here
      });

      const deleteButton = row.querySelector(".delete-button");
      deleteButton.addEventListener("click", function () {
        // Handle delete button click logic here
      });

      tbody.appendChild(row);
    });
  }

  // Helper function to show a specific screen and hide others
  function showScreen(screenToShow) {
    screens.forEach((screen) => {
      if (screen.id === screenToShow.id) {
        screen.style.display = "block";
      } else {
        screen.style.display = "none";
      }
    });
  }

  // Back button handling
  document.querySelectorAll(".back-button").forEach(function (button) {
    button.addEventListener("click", function () {
      goBack();
    });
  });

  function goBack() {
    const currentScreen = Array.from(screens).find(
      (screen) => window.getComputedStyle(screen).display === "block"
    );
    const nextScreen = jobsScreen; // Assuming going back always leads to the jobs screen, modify as needed

    if (currentScreen && nextScreen) {
      currentScreen.style.display = "none";
      nextScreen.style.display = "block";
    }
  }
});
