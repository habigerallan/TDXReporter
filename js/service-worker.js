const TDX_ORIGIN = 'https://tdx.umn.edu/TDNext/Apps/29/Reporting/';

const updateSidePanelVisibility = async (tabId, url) => {
  if (url.startsWith(TDX_ORIGIN)) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'html/sidepanel.html',
      enabled: true,
    });
  } else {
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
};

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url) {
    await updateSidePanelVisibility(tab.id, tab.url);
  } else {
    console.log("onClick Listener Failed");
  }
}); 

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  if (tab.url) {
    await updateSidePanelVisibility(tabId, tab.url);
  } else {
    console.log("onUpdated Listener Failed");
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url) {
    await updateSidePanelVisibility(activeInfo.tabId, tab.url);
  } else {
    console.log("onActivated Listener Failed");
  }
});
