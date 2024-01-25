document.getElementById("start_crawling").addEventListener("click", async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "fetchLinks" }, async (response) => {});
  });
});
