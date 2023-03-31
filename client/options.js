/* eslint-disable no-undef */
const anonId = document.querySelector('.anonId');
chrome.storage.local.get('anonId', (data) => {
  anonId.textContent = data.anonId;
});
const sendLogs = document.querySelector('.sendLogs');
sendLogs.addEventListener('click', () => {
//   chrome.runtime.reload(); //DEV ONLY
  chrome.storage.local.get('logs', (data) => {
    const { logs } = data;
    console.log(logs);
  });
});
