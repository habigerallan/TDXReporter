console.log("main started");

document.getElementById('uuid-button').addEventListener('click', function() {
    const uuidValue = document.getElementById('uuid-input').value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        // Send message to the content script of the active tab
        chrome.tabs.sendMessage(activeTab.id, { action: "run_report", uuid: uuidValue });
    });
});
