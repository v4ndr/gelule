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

chrome.runtime.onInstalled.addListener(async () => {
  chrome.tabs.create({ url: 'https://www.gelule.vandr.fr/landing.html' });
});

chrome.runtime.onConnect.addListener(() => {});

chrome.storage.local.get(['anonId'], (res) => {
  if (res.hasOwnProperty('anonId')) {
    status = res.anonId ? 'INACTIVE' : 'REGISTER';
    anonId = res.anonId;
  } else {
    status = 'REGISTER';
  }

  chrome.tabs.onRemoved.addListener((tabId) => {
    const index = injectedTabs.indexOf(tabId);
    if (index > -1) {
      injectedTabs.splice(index, 1);
    }
  });

  chrome.runtime.onMessage.addListener(async (msg, sender) => {
    const senderId = sender.tab?.id;
    let tabIndex = null;
    const { type, detail } = msg;
    switch (type) {
      case 'GET_STATUS':
        await chrome.tabs.sendMessage(senderId, { type: 'STATUS', detail: { status } });
        injectedTabs.push(senderId);
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
          }, 900000);
          session = initSession(anonId);
        } else if (detail.status === 'ASK_SUCCESS') {
          setTimeout(() => {
            status = 'INACTIVE';
            sendStatusToAllTabs(injectedTabs, status);
          }, 4000);
        }
        break;

      case 'REGISTER':
        anonId = detail.anonId;
        chrome.storage.local.set({ anonId }, async () => {
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
        clearTimeout(timeoutId);
        timeoutId = null;
        break;

      case 'DISCONNECT_TAB':
        tabIndex = injectedTabs.indexOf(senderId);
        if (index > -1) {
          injectedTabs.splice(tabIndex, 1);
        }
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
          session = handleEntry(whitelist, whitelistDomains, url, session);
        }
      }
    },
  );
});
