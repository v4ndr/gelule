/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */

/*
  EXTENSION STATES :
  - REGISTER : user is not authenticated
    - REGISTER_SUCCESS : user has just authenticated
  - ASK : satisfaction survey is displayed
    - ASK_SUCCESS : user has just answered the satisfaction survey
  - INACTIVE : user is authenticated and disabled
  - ACTIVE : user is authenticated and enabled
*/

import initSession from './utils/initSession.js';
import closeSession from './utils/closeSession.js';
import submitSession from './utils/submitSession.js';
import handleEntry from './utils/handleEntry.js';
import whitelist from './utils/whitelist.js';
import sendStatusToAllTabs from './utils/sendStatusToAllTabs.js';
import saveLog from './utils/saveLog.js';

let status = 'unknown';
let anonId = null;
let session = {};
const injectedTabs = [];
let timeoutId = null;

const whitelistDomains = whitelist
  .reduce((acc, curr) => {
    acc.push(curr.domain);
    return acc;
  }, []);

// chrome.storage.local.clear(); // DEV ONLY

saveLog(`background.js loaded with status ${status} and anonId ${anonId}`);

chrome.runtime.onInstalled.addListener(async () => {
  chrome.tabs.create({ url: 'https://www.gelule.vandr.fr/landing.html' });
});

chrome.runtime.onConnect.addListener(() => {});

chrome.storage.local.get(['anonId'], (res) => {
  if (res.hasOwnProperty('anonId')) {
    saveLog(`anonId retrieved from storage : ${res.anonId}`);
    status = res.anonId ? 'INACTIVE' : 'REGISTER';
    saveLog(`status set to ${status}`);
    anonId = res.anonId;
  } else {
    status = 'REGISTER';
    saveLog(`anonId not found in storage, status set to ${status}`);
  }

  chrome.tabs.onRemoved.addListener((tabId) => {
    saveLog(`Tab ${tabId} removed`);
    const index = injectedTabs.indexOf(tabId);
    if (index > -1) {
      injectedTabs.splice(index, 1);
      saveLog(`Tab ${tabId} removed from injectedTabs (${injectedTabs})`);
    }
  });

  chrome.runtime.onMessage.addListener(async (msg, sender) => {
    const senderId = sender.tab?.id;
    let tabIndex = null;
    const { type, detail } = msg;
    switch (type) {
      case 'GET_STATUS':
        await chrome.tabs.sendMessage(senderId, { type: 'STATUS', detail: { status } });
        if (!injectedTabs.includes(senderId)) {
          injectedTabs.push(senderId);
        }
        saveLog(`status asked by content script, status <${status}> sent to tab ${senderId} and added to injectedTabs (${injectedTabs})`);
        break;

      case 'SET_STATUS':
        status = detail.status;
        sendStatusToAllTabs(injectedTabs, status);
        if (detail.status === 'ACTIVE') {
          timeoutId = setTimeout(() => {
            session = {};
            status = 'INACTIVE';
            chrome.tabs.sendMessage(senderId, { type: 'STATUS', detail: { status } });
            timeoutId = null;
            saveLog(`Session ended after 15 minutes and status set to ${status}`);
          }, 900000);
          session = initSession(anonId);
        } else if (detail.status === 'ASK_SUCCESS') {
          setTimeout(() => {
            status = 'INACTIVE';
            sendStatusToAllTabs(injectedTabs, status);
          }, 4000);
        }
        saveLog(`SET_STATUS received from content script, status set to ${status} and sent to all tabs (${injectedTabs})`);
        break;

      case 'REGISTER':
        anonId = detail.anonId;
        chrome.storage.local.set({ anonId }, async () => {
          saveLog(`anonId saved in storage : ${anonId}`);
          status = 'REGISTER_SUCCESS';
          sendStatusToAllTabs(injectedTabs, status);
          setTimeout(() => {
            status = 'INACTIVE';
            sendStatusToAllTabs(injectedTabs, 'INACTIVE');
          }, 4000);
        });
        break;

      case 'END_SESSION':
        await submitSession(closeSession(session, detail.satisfaction));
        saveLog(`Session ended with satisfaction ${detail.satisfaction} and submitted from background script`);
        clearTimeout(timeoutId);
        timeoutId = null;
        break;

      case 'DISCONNECT_TAB':
        tabIndex = injectedTabs.indexOf(senderId);
        if (index > -1) {
          injectedTabs.splice(tabIndex, 1);
          saveLog(`Tab ${senderId} disconneced and removed from injectedTabs (${injectedTabs})`);
        }
        break;

      case 'LOG':
        saveLog(detail.log);
        break;

      default:
        break;
    }
  });

  chrome.tabs.onUpdated.addListener(
    (_, changeInfo) => {
      if (changeInfo.url) {
        if (changeInfo.url === 'chrome://newtab/') {
          chrome.tabs.update({ url: 'https://www.google.fr/' });
        }
        if (status === 'ACTIVE') {
          const { url } = changeInfo;
          saveLog('Tab updated : handling entry');
          session = handleEntry(whitelist, whitelistDomains, url, session);
        }
      }
    },
  );
});
