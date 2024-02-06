// content2.js


// Initialize Quill editor
document.addEventListener("DOMContentLoaded", function () {
  const quill = new Quill("#editor", {
    theme: "snow", // You can choose a different theme if needed
    placeholder: "Type your CV here...",
  });
});


// Add an event listener for "Use Profile" buttons
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("use-profile-button")) {
    switchToCVPreviewSlide();
  }
});

// Function to switch between slides
function switchToSlide(slide) {
  const popupContent = document.querySelector(".rd-popup .rd-popup-content");
  popupContent.innerHTML = slide;
}

// Function to switch to the CV Preview slide
function switchToCVPreviewSlide() {
//    const popupContent = document.querySelector(".rd-popup .rd-popup-content");
//    popupContent.innerHTML = createCVPreviewSlide();

//    // Remove the "Profiles Table" screen
//    const profileScreen = document.querySelector(
//      ".rd-popup .rd-no-resume-content"
//    );
//    if (profileScreen) {
//      profileScreen.remove();
//    }

switchToSlide(createCVPreviewSlide());
}

// Function to close the popup overlay
function closePopupOverlay() {
  const popupOverlay = document.getElementById("rd-popup-overlay");
  if (popupOverlay) {
    popupOverlay.style.setProperty("--dim-popup", "0");

    // Optionally, remove the popup overlay from the DOM after the animation
    setTimeout(() => {
      document.body.removeChild(popupOverlay);
    }, 300);
  }
}

function createPopupOverlay() {
  const popupOverlay = document.createElement("div");
  popupOverlay.id = "rd-popup-overlay";
  popupOverlay.className = "rd-popup-overlay";
  popupOverlay.style.setProperty("--dim-popup", "1");

  // Create the modal container
  const popupOverlayModal = document.createElement("div");
  popupOverlayModal.id = "rd-popup";

  // Create the popup content
  const popupContent = document.createElement("div");
  popupContent.className = "rd-popup";

  // Default to Slide 1
  popupContent.innerHTML = createProfilesSlide();

  // Append the popup content to the modal container
  popupOverlayModal.appendChild(popupContent);

  // Append the modal container to the overlay
  popupOverlay.appendChild(popupOverlayModal);

  // Append the popup overlay to the document body
  document.body.appendChild(popupOverlay);

  // Add an event listener to close the popup overlay when clicking the close button
  const closeButton = document.getElementById("rd-close-popup");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closePopupOverlay();
    });
  }
}

// Function to create the Profiles Table slide
function createProfilesSlide() {
  return `
     <div id="rd-popup" style="--dim-popup: 0;" class="rd-popup">
            <!-- Slide 1: Profiles Table -->
            <div class="rd-popup-action-title" style="position: relative">
                <h6 class="rd-text-content rd-popup-head-title" style="font-size: 20px !important">Profiles</h6>
                <svg id="rd-close-popup" width="20" height="20" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <!-- Add the close button path elements here -->
                </svg>
            </div>
            <div class="rd-no-resume-content rd-overflow-y rd-popup-content">
                <!-- Add your Bootstrap table with profiles here -->
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Job Category</th>
                            <th scope="col">Job Type</th>
                            <th scope="col">Roles</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Add rows with "Use Profile" buttons -->
                        <tr>
                            <td>Category 1</td>
                            <td>Type 1</td>
                            <td>Role 1</td>
<td><button class="use-profile-button">Use Profile</button></td>
                        </tr>
                        <!-- Add more rows as needed -->
                    </tbody>
                </table>
            </div>
        </div>

  `;
}

// Function to create the Customized CV Preview slide
function createCVPreviewSlide() {
  return `
  <head><script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</head>
      <div id="rd-popup" style="--dim-popup: 0;" class="rd-popup">
            <div class="rd-popup-action-title" style="position: relative">
                <h6 class="rd-text-content rd-popup-head-title" style="font-size: 20px !important">CV Preview</h6>
                <svg id="rd-close-popup" width="20" height="20" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <!-- Add the close button path elements here -->
                </svg>
            </div>
            <div class="rd-no-resume-content rd-overflow-y rd-popup-content">
                <!-- Initialize Quill editor -->
                <div id="editor"></div>
                <!-- Add "Open with Google Docs" and "Download" buttons -->
                <button>Open with Google Docs</button>
                <button>Download</button>
            </div>
        </div>
    </div>
  `;

}


// Inject the CSS styles for the popup overlay
const cssStyles2 = `
  /* Style for the popup overlay */
  .rd-popup-overlay {
    --dim-popup: 0;
    --rd-hint-top: 150px;
    --rd-hint-left: 400px;
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 99999;
    transform: scale(var(--dim-popup));
    opacity: var(--dim-popup);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0px !important;
    left: 0px !important;
    pointer-events: all !important;
    overflow: hidden;
    transition: all 50ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  }
/* Add your additional styles as needed */
.rd-popup {
  /* Your modal styles */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.rd-popup-action-title {
  /* Additional styles for the action title bar */
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.rd-popup-content {
  /* Additional styles for the popup content */
  margin-top: 10px;
}

`;

// Create a style element and append it to the document head
const styleElement2 = document.createElement("style");
styleElement2.textContent = cssStyles2;
document.head.appendChild(styleElement2);

// Function to create the new button
function createNewButton() {
  const newButton = document.createElement("button");
  newButton.id = "tr-menu-btn";
  newButton.type = "button";
  newButton.className = "tr-menu-btn";
  newButton.style.display = "flex";
  newButton.addEventListener("click", function (event) {
    event.preventDefault();
    createPopupOverlay();
  });

  // Create SVG element and set its attributes
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("width", "24");
  svgElement.setAttribute("height", "24");
  svgElement.setAttribute("viewBox", "0 0 48 48");
  svgElement.setAttribute("fill", "none");

  // Create path elements and set their attributes
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M0 33.23h29.538V48H6a6 6 0 0 1-6-6v-8.77z");
  path1.setAttribute("fill", "#FFC666");

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M0 6a6 6 0 0 1 6-6h23.538v29.538H0V6z");
  path2.setAttribute("fill", "#FF6F5B");

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute(
    "d",
    "M33.23 0C41.389 0 48 6.612 48 14.77c0 8.156-6.612 14.768-14.77 14.768V0z"
  );
  path3.setAttribute("fill", "#855AEA");

  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute(
    "d",
    "M33.23 33.23c6.084 0 11.309 3.679 13.571 8.932C48.112 45.206 45.314 48 42 48h-8.77V33.23z"
  );
  path4.setAttribute("fill", "#FF9CAE");

  // Append path elements to the SVG element
  svgElement.appendChild(path1);
  svgElement.appendChild(path2);
  svgElement.appendChild(path3);
  svgElement.appendChild(path4);

  // Append the SVG element to the button
  newButton.appendChild(svgElement);

  // Append the button to the document body
  document.body.appendChild(newButton);
}

// Inject the CSS styles for the new button
const cssStyles = `
  /* Style for the new button */
  .tr-menu-btn {
    position: fixed;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    height: 40px;
    width: 40px;
    background-color: var(--color-rd-grey-900);
    box-shadow: rgb(177, 176, 176) 0px 0px 7px 1px;
    bottom: 15px;
    right: 15px;
    z-index: 999999;
    cursor: pointer;
    display: flex !important;
    pointer-events: all !important;
    border-radius: 12px;
    transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
    border-width: initial !important;
    border-style: none !important;
    border-color: initial !important;
    border-image: initial !important;
    outline: none !important;
    padding: 0px !important;
  }
`;

// Create a style element and append it to the document head
const styleElement = document.createElement("style");
styleElement.textContent = cssStyles;
document.head.appendChild(styleElement);

// Call the function to create the new button
createNewButton();
