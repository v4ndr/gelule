/* eslint-disable no-undef */
const toggleTracker = (status) => {
  const newStatus = !status;
  chrome.storage.local.set({ active: newStatus }, () => {
    chrome.action.setIcon({ path: newStatus ? '../assets/enabled128.png' : '../assets/disabled128.png' });
    chrome.action.setPopup({ popup: newStatus ? '../popup/html/askForSatisfaction.html' : '' });
  });
};

export default toggleTracker;
