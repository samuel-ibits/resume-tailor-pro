document.getElementById("start_extraction").addEventListener("click", async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractProfiles" }, async (response) => {
    });
  });
});
