// scripts/background.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.action);
  
    if (request.action === "navigateToTailorResume") {
    // Access job information from the message
    const jobInfo = request.jobInfo;

    // Store the job information in storage (you can use other mechanisms like local storage or variables)
    chrome.storage.local.set({ jobInfo: jobInfo });

    // Open the tailor resume page in the extension
    chrome.tabs.create({ url: chrome.runtime.getURL("tailor_resume.html") });
  }

  // New action to open the tailor resume section
  if (request.action === "openTailorResumeSection") {
    // Access job information from the message
    const jobInfo = request.jobInfo;
    console.log("got to background");
    // Store the job information in storage (you can use other mechanisms like local storage or variables)
    chrome.storage.local.set({ jobInfo: jobInfo });

    // Broadcast a message to all tabs to open the popup and navigate to the tailor resume page
    // chrome.tabs.query({}, function (tabs) {
    //   tabs.forEach(function (tab) {
    //     chrome.tabs.sendMessage(tab.id, { action: "openTailorResumeSection" });
    //   });
    // });

    chrome.tabs.create({ url: "popup.html" });

    //  chrome.action.openPopup();
  }
});
