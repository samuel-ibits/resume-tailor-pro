// content/applyButton.js
// This script assumes a hypothetical class name "apply-button" for the Apply button. Adjust it based on the actual structure of the job pages.

const applyButton = document.querySelector(".apply-button");

if (applyButton) {
  const customButton = document.createElement("button");
  customButton.innerText = "Apply with ResumeTailorPro";
  customButton.addEventListener("click", handleApplyClick);

  // Replace the original Apply button with the custom button
  applyButton.parentNode.replaceChild(customButton, applyButton);
}

function handleApplyClick() {
  // Perform actions when the custom button is clicked
  // For example, trigger the ResumeTailorPro functionality
}
