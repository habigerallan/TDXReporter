chrome.action.onClicked.addListener(tab => {
    const tabId = tab.id;

    chrome.sidePanel.open({
        tabId: tabId,
    });
});


chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.sidePanel.setOptions({
        tabId: activeInfo.tabId,
        path: 'html/side_panel.html',
        enabled: true
    });
});

async function onLoad() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
    if (tab && tab.id !== undefined) {
        await chrome.sidePanel.setOptions({
            tabId: tab.id,
            path: 'html/side_panel.html',
            enabled: true
        });
    }
}

chrome.runtime.onStartup.addListener(onLoad);
chrome.runtime.onInstalled.addListener(onLoad);