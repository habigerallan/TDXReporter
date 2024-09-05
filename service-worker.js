const TDX_ORIGIN = 'https://tdx.umn.edu/TDNext/Apps/29/Reporting/';

// Function to set side panel options based on the tab's URL
const updateSidePanelAvailability = async (tabId, url) => {
  if (url.startsWith(TDX_ORIGIN)) {
    // Enable the side panel for the specified origin
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'html/sidepanel.html',
      enabled: true,
    });
  } else {
    // Disable the side panel for all other URLs
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
};

// Listener for when the tab is updated
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status === 'complete' && tab.url) {
    await updateSidePanelAvailability(tabId, tab.url);
  }
});

// Listener for when the tab is activated (switched to)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url) {
    await updateSidePanelAvailability(activeInfo.tabId, tab.url);
  }
});
