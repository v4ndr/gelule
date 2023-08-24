// eslint-disable-next-line import/extensions
import saveLog from './saveLog.js';

/* eslint-disable no-undef */
const sendMsgToAllTabs = async (msg) => {
  const { type } = msg;
  let detail;
  if (msg?.detail) {
    detail = msg.detail;
  }
  const tabs = await chrome.tabs.query({});
  const promises = [];
  const sendToTab = async (tab) => {
    try {
      await chrome.tabs.sendMessage(tab.id, { type, detail });
      if (chrome.runtime.lastError) {
        saveLog(`Error while sending status to tab ${tab.id}: ${chrome.runtime.lastError.message}`);
      } else {
        saveLog(`Sent msg {${type} | ${detail ? JSON.stringify(detail) : ''}} to tab ${tab.id}`);
      }
    } catch (err) {
      saveLog(`Error while sending status to tab ${tab.id}: ${err.message}`);
    }
  };

  tabs.forEach((tab) => {
    promises.push(sendToTab(tab));
  });

  return Promise.allSettled(promises);
};

export default sendMsgToAllTabs;
