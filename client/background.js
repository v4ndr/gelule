/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import uuid from './utils/uuid.js';
import authDevice from './utils/authDevice.js';
import initSession from './utils/initSession.js';
import closeSession from './utils/closeSession.js';
import submitSession from './utils/submitSession.js';
import handleEntry from './utils/handleEntry.js';
import whitelist from './utils/whitelist.js';
import sendStatusToAllTabs from './utils/sendStatusToAllTabs.js';

let status = 'unknown';
let session = {};
const injectedTabs = [];
let timeoutId = null;

const whitelistDomains = whitelist
  .reduce((acc, curr) => {
    acc.push(curr.domain);
    return acc;
  }, []);

chrome.storage.local.get(['certified'], (res) => {
  if (res.hasOwnProperty('certified')) {
    status = res.certified ? 'INACTIVE' : 'AUTH';
  } else {
    chrome.storage.local.set({ deviceId: uuid() });
    status = 'AUTH';
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  chrome.tabs.create({ url: 'https://www.gelule.vandr.fr/landing.html' });
  let certified = null;
  chrome.storage.local.clear();
  chrome.storage.local.get(['deviceId', 'certified'], (res) => {
    if (!res.hasOwnProperty('deviceId')) {
      chrome.storage.local.set({ deviceId: uuid() });
    }
    if (res.hasOwnProperty('certified')) {
      certified = res.certified;
      status = certified ? 'INACTIVE' : 'AUTH';
    } else {
      chrome.storage.local.set({ certified: false });
      status = 'AUTH';
    }
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  const index = injectedTabs.indexOf(tabId);
  if (index > -1) {
    injectedTabs.splice(index, 1);
  }
});

// eslint-disable-next-line consistent-return
chrome.runtime.onMessage.addListener(async (msg, sender) => {
  const senderId = sender.tab?.id;
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
        chrome.storage.local.get(['deviceId', 'certified'], (result) => {
          const { deviceId, certified } = result;
          if (certified) {
            timeoutId = setTimeout(() => {
              session = {};
              status = 'INACTIVE';
              chrome.tabs.sendMessage(senderId, { type: 'STATUS', detail: { status } });
              timeoutId = null;
            }, 900000);
            session = initSession(deviceId);
          }
        });
      } else if (detail.status === 'ASK_SUCCESS') {
        setTimeout(() => {
          status = 'INACTIVE';
          sendStatusToAllTabs(injectedTabs, 'INACTIVE');
        }, 4000);
      }
      break;

    case 'AUTH':
      chrome.storage.local.get(['deviceId'], (result) => {
        const { deviceId } = result;
        let certified = false;
        if (deviceId) {
          authDevice(detail.pinCode, deviceId, (res) => {
            certified = JSON.parse(res).auth;
            chrome.storage.local.set({ certified }, async () => {
              if (senderId) {
                status = certified ? 'AUTH_SUCCESS' : 'AUTH_ERROR';
                sendStatusToAllTabs(injectedTabs, status);
                if (status === 'AUTH_SUCCESS') {
                  setTimeout(() => {
                    status = 'INACTIVE';
                    sendStatusToAllTabs(injectedTabs, 'INACTIVE');
                  }, 4000);
                }
              }
            });
          });
        } else {
          chrome.storage.local.set({ certified: false }, async () => {
            status = 'AUTH_ERROR';
            sendStatusToAllTabs(injectedTabs, 'AUTH_ERROR');
          });
        }
      });
      break;

    case 'END_SESSION':
      await submitSession(closeSession(session, detail.satisfaction));
      clearTimeout(timeoutId);
      timeoutId = null;
      break;

    default:
      break;
  }
});

// watch activity (tracking), only if status is ACTIVE
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
