/* eslint-disable no-undef */
const anonId = document.querySelector('.anonId');
let anonIdValue = '';
chrome.storage.local.get('anonId', (data) => {
  anonIdValue = data.anonId;
  anonId.textContent = anonIdValue;
});
const sendLogs = document.querySelector('.sendLogs');
sendLogs.addEventListener('click', () => {
  const bugReport = document.querySelector('#bugReport').value;
  chrome.runtime.sendMessage({ type: 'LOG', detail: { log: 'Extension reset and logs sent' } });
  chrome.runtime.sendMessage({ type: 'DISCONNECT' });
  chrome.storage.local.get('logs', async (data) => {
    const { logs } = data;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const dateStr = new Date().toLocaleString();
    const bugReportStr = `${dateStr} - [bug report] ${bugReport}`;
    logs.push(bugReportStr);

    const urlencoded = new URLSearchParams();
    urlencoded.append('anonId', anonIdValue);
    urlencoded.append('logs', JSON.stringify(logs));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };
    await fetch('https://www.gelule.vandr.fr/api/logs/', requestOptions); // PROD ONLY
    // await fetch('http://localhost:3001/logs/', requestOptions); // DEV ONLY
    await chrome.storage.local.clear();
    chrome.runtime.reload();
  });
});
