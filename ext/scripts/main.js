// content2.js

// Function to create the popup overlay
function createPopupOverlay() {
  const popupOverlay = document.createElement("div");
  popupOverlay.id = "rd-popup-overlay";
  popupOverlay.className = "rd-popup-overlay";
  popupOverlay.style.setProperty("--dim-popup", "1");

  // HTML for the popup overlay
  popupOverlay.innerHTML = `
    <div id="rd-popup" style="--dim-popup: 0;">
      <div class="rd-popup">
        <!-- Your existing popup content HTML goes here -->
      </div>
    </div>
  `;

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

// Function to handle the menu button click
function handleMenuButtonClick() {
  // Open the popup overlay
  createPopupOverlay();
}

// Inject the CSS styles
const cssStyles = `
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
`;

// Create a style element and append it to the document head
const styleElement = document.createElement("style");
styleElement.textContent = cssStyles;
document.head.appendChild(styleElement);

// Call the function to handle the menu button click
document
  .getElementById("tr-menu-btn")
  .addEventListener("click", handleMenuButtonClick);


  export { createPopupOverlay };