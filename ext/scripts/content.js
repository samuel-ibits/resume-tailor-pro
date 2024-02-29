// scripts/content.js

// Function to extract job information from the page
function extractJobInformation() {
  // Replace these selectors with the actual ones for the job information on the Indeed page
  const jobTitleElement = document.querySelector(".job-title");
  const companyElement = document.querySelector(".company-name");
  const locationElement = document.querySelector(".css-1ikmi61.eu4oa1w0");
  const payElement = document.querySelector(".css-19j1a75.eu4oa1w0");

  const jobTitle = jobTitleElement ? jobTitleElement.textContent.trim() : "";
  const company = companyElement ? companyElement.textContent.trim() : "";
  const location = locationElement ? locationElement.textContent.trim() : "";
  const pay = payElement ? payElement.textContent.trim() : "";

  const extractJobInformation = {
    jobTitle,
    company,
    location,
    pay,
  };
  console.log(extractJobInformation);
  return extractJobInformation;
}

// Function to create the "Tailor Resume" button
function createTailorButton() {
  console.log("content called");

  // for linkedin
  const applyButtonLinkedin = document.querySelector(
    '[data-control-name="apply_top_card"]'
  );
  if (applyButtonLinkedin) {
    console.log("linkedin called");

    const tailorButton = document.createElement("button");
    tailorButton.innerText = "Tailor Resume";
    tailorButton.className = "css-2h4ulj e8ju0x51";
    tailorButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default action of the button

      // Extract job information
      const jobInfo = extractJobInformation();

      // Send a message to the background script to open the tailor resume section
      chrome.runtime.sendMessage({
        action: "openTailorResumeSection",
        jobInfo,
      });
    });

    applyButtonLinkedin.parentNode.insertBefore(
      tailorButton,
      applyButtonLinkedin.nextSibling
    );
  }

  // for indeed
  const applyButtonIndeed = document.querySelector(
    '[id="saveJobButtonContainer"]'
  );
  if (applyButtonIndeed) {
    console.log("indeed called");
    const tailorButton = document.createElement("button");

    // Add write edit icon as an SVG
    const iconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    iconSvg.setAttribute("width", "16");
    iconSvg.setAttribute("height", "16");
    iconSvg.setAttribute("fill", "currentColor");
    iconSvg.setAttribute("class", "bi bi-pencil-fill");
    iconSvg.innerHTML =
      '<path d="M2 12.5l-1 1V15h2.5l8.1-8.1-1-1L2 12.5zM14.71 2.79a1 1 0 0 0 0-1.41l-1.42-1.42a1 1 0 0 0-1.41 0L3 10.1l-2 8.01 8.01-2L14.71 4.2a1 1 0 0 0 0-1.41z"/>';

    // Append the icon and text to the button
    tailorButton.appendChild(document.createTextNode("Tailor Resume "));
    tailorButton.appendChild(iconSvg);
    tailorButton.className = "css-indeed";
    tailorButton.style.backgroundColor = "#2557a7";
    tailorButton.style.color = "#fff"; // Set text color to white
    tailorButton.style.border = "0.125rem solid #2557a7";
    tailorButton.style.fontSize = "1rem";
    tailorButton.style.fontWeight = "bold"; // Set font weight to bold
    tailorButton.style.padding = "0.5625rem 1rem";
    tailorButton.style.height = "43px";
    tailorButton.style.display = "flex";
    tailorButton.style.margin = "0px";
    tailorButton.style.width = "auto";
    tailorButton.style.borderRadius = "8px"; // Set border radius for curved edges
    tailorButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default action of the button

      // Extract job information
      const jobInfo = extractJobInformation();

      // Navigate to the tailor resume page with job information

      chrome.runtime.sendMessage({
        action: "openTailorResumeSection",
        jobInfo,
      });
      console.log('sent')
    });

    applyButtonIndeed.parentNode.insertBefore(
      tailorButton,
      applyButtonIndeed.nextSibling
    );
  }
}

// Use MutationObserver to wait for changes in the DOM
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // Check if the target element is available
    if (
      document.querySelector('[data-control-name="apply_top_card"]') ||
      document.querySelector('[id="saveJobButtonContainer"]')
    ) {
      // If the element is available, stop observing and run the createTailorButton function
      observer.disconnect();
      createTailorButton();
    }
  });
});

// Start observing changes in the DOM
observer.observe(document.documentElement, { childList: true, subtree: true });
