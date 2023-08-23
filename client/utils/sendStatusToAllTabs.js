// eslint-disable-next-line import/extensions
import saveLog from './saveLog.js';

/* eslint-disable no-undef */
const sendStatusToAllTabs = async (status) => {
  const tabs = await chrome.tabs.query({});
  tabs.forEach(async (tab) => {
    try {
      const res = await chrome.tabs.sendMessage(tab.id, { type: 'STATUS', detail: { status } });
      console.log(res ? 'receiving end exists' : 'no receiving end');
    } catch (err) {
      saveLog(`Error while sending status to tab ${tab.id} : ${err} | ${chrome.runtime.lastError}`);
    }
  });
};

export default sendStatusToAllTabs;
