/* eslint-disable no-undef */
const saveLog = (log) => {
  chrome.storage.local.get(['logs'], (results) => {
    const logs = Object.prototype.hasOwnProperty.call(results, 'logs') ? results.logs : [];
    const datedLog = `${new Date().toISOString()} - ${log}`;
    logs.push(datedLog);
    chrome.storage.local.set({ logs });
  });
};

export default saveLog;
