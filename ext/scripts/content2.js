// content2.js




// GOOGLE DOCS
async function createGoogleDoc(text) {
  const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with your access token

  try {
    const response = await fetch('https://docs.googleapis.com/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'My New Document',
        content: [
          {
            type: 'paragraph',
            elements: [
              {
                textRun: {
                  content: text
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create Google Doc');
    }

    const responseData = await response.json();
    console.log('Document created:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error creating Google Doc:', error);
    return null;
  }
}




//CANVA
async function createDesignInCanva(text) {
  const apiKey = 'YOUR_CANVA_API_KEY'; // Replace with your Canva API key

  try {
    const response = await fetch('https://api.canva.com/v1/templates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        templateId: 'YOUR_TEMPLATE_ID', // Replace with your Canva template ID
        elements: [
          {
            type: 'text',
            x: 100,
            y: 100,
            content: text,
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000000'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create design in Canva');
    }

    const responseData = await response.json();
    console.log('Design created in Canva:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error creating design in Canva:', error);
    return null;
  }
}


// Function to generate resume using OpenAI API
async function generateResume(jobDetails, embeddedText) {
  const apiKey = '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';
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  
  // Prepare the prompt with job details and embedded text
  const prompt = `Here is my Details:\n${JSON.stringify(jobDetails)}\n\n and the Job details :\n${embeddedText}\n\n Kindly Generate a professional resume: that proves i am the right person for the job`;
  
  // Send request to OpenAI API
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      messages: [{
        role: "user", content: prompt}],
      model: "gpt-3.5-turbo",
    })
  });
  
  if (!response.ok) {
    console.log(response, "openai")
    throw new Error('Failed to generate resume');
  }
  
  const data = await response.json();
  return data.choices[0].message.content.trim();
}


// Add an event listener for "Use canva" buttons
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("use-canva-button")) {
    const cvPreviewContent = document.querySelector(".rd-popup .rd-no-resume-content");
    const textToInsert = cvPreviewContent.textContent.trim();

    createDesignInCanva(textToInsert).then(design => {
      // Handle the response
      console.log(design)
    });
  }
});


// Add an event listener for "Use googledocs" buttons
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("use-googledocs-button")) {
    const cvPreviewContent = document.querySelector(".rd-popup .rd-no-resume-content");
    const textToInsert = cvPreviewContent.textContent.trim();

    createGoogleDoc(textToInsert).then(design => {
      // Handle the response
      console.log(design)
    });
    
  }
});

// Add an event listener for "Use Profile" buttons
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("use-profile-button")) {
    const profileRow = event.target.closest("tr");
    if (profileRow) {
      const jobDetails = extractJobDetails(profileRow);
      console.log(jobDetails, "job  ")
      switchToCVPreviewSlide(jobDetails);
    }
  }
});

// Function to extract job details from the row
function extractJobDetails(row) {
  const industry = row.querySelector("td:nth-child(1)").textContent;
  const jobTitle = row.querySelector("td:nth-child(2)").textContent;
  const role = row.querySelector("td:nth-child(3)").textContent;
  // const summary = row.querySelector("td:nth-child(4)").textContent;
  // const description = row.querySelector("td:nth-child(5)").textContent;
  // const requirements = row.querySelector("td:nth-child(6)").textContent;

  return { jobTitle, industry, role };
}


// Function to switch between slides
function switchToSlide(slide) {
  const popupContent = document.querySelector(".rd-popup .rd-popup-content");
  popupContent.innerHTML = slide;
}

// Function to switch to the CV Preview slide
async function switchToCVPreviewSlide(jobDetails) {

  
  // Fetch the desired information from the main webpage
  const jobDetailsElement = document.querySelector(".jobsearch-embeddedBody.css-1omm75o.eu4oa1w0");


  // Extract the text content from the job details element
  const embeddedBodyText = jobDetailsElement.textContent;


  // Generate resume using OpenAI API
  const resume = await generateResume(jobDetails, embeddedBodyText);
  
switchToSlide(createCVPreviewSlide( resume));
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

                        <tr>
                        <td>Category 2</td>
                        <td>Type 2</td>
                        <td>Role 2</td>
<td><button class="use-profile-button">Use Profile</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

  `;
}

// Function to create the Customized CV Preview slide
function createCVPreviewSlide(resume) {


    // Ensure job details are provided
    if (!resume) {
      return "resume not created"; // Or any other suitable message
    }
  

  // Construct the CV Preview slide HTML with the fetched information
  return `
    <div id="rd-popup" style="--dim-popup: 0;" class="rd-popup">
      <div class="rd-popup-action-title" style="position: relative">
        <h6 class="rd-text-content rd-popup-head-title" style="font-size: 20px !important">CV Preview</h6>
        <svg id="rd-close-popup" width="20" height="20" viewBox="0 0 14 14" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <!-- Add the close button path elements here -->
        </svg>
      </div>
      <div class="rd-no-resume-content rd-overflow-y rd-popup-content">
      
        <!-- Display the fetched information from the main webpage -->
        ${resume}
        <!-- Add "Open with Google Docs", "Open with Canva" and "Download" buttons -->
        <button class="use-googledocs-button">Open with Google Docs</button>
        <button class="use-canva-button">Open with Canva</button>
        <button class="use-download-button">Download</button>
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
