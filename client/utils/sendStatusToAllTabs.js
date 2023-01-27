/* eslint-disable no-undef */
const sendStatusToAllTabs = (injectedTabs, status) => (
  injectedTabs.forEach((tabId) => {
    chrome.tabs.sendMessage(tabId, { type: 'STATUS', detail: { status } });
  })
);

export default sendStatusToAllTabs;
