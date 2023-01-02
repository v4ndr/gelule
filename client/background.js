/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import handleEntry from './utils/handleEntry.js';
import initSession from './utils/initSession.js';
import closeSession from './utils/closeSession.js';
import toggleTracker from './utils/toggleTracker.js';
import whitelist from './utils/whitelist.js';
import uuid from './utils/uuid.js';
import submitSession from './utils/submitSession.js';
import authDevice from './utils/authDevice.js';

//import whitelist in scope
const whitelistDomains = whitelist
  .reduce((acc, curr) => {
    acc.push(curr.domain);
    return acc;
  }, []);

/*
  ON EXTENSION INSTALLATION
*/
chrome.runtime.onInstalled.addListener(async() => {
  let certified = null;
  chrome.storage.local.clear();
  chrome.storage.local.set({ active: false });
  chrome.storage.local.get(['deviceId', 'certified'], (res) => {
    if (!res.hasOwnProperty('deviceId')) {
      chrome.storage.local.set({ deviceId: uuid() });
    }
    if (res.hasOwnProperty('certified')) {
      certified = res.certified;
      chrome.action.setPopup({ popup: certified ? '' : './popup/html/pinInput.html' });
    } else {
      chrome.storage.local.set({ certified: false });
      chrome.action.setPopup({ popup: './popup/html/pinInput.html' });
    }
  });
});

/*
  EXTENSION FROM DISABLE TO ENABLE
*/
chrome.action.onClicked.addListener(
  () => {
    chrome.storage.local.get(['active', 'deviceId', 'certified'], (result) => {
      const { active, deviceId, certified } = result;
      if (certified) {
        toggleTracker(active);
        if (!active) {
          chrome.storage.local.set({ session: initSession(deviceId) }, () => {
          });
        }
      }
    });
  },
);

/*
  RECEIVE MESSAGES FROM POPUP
    - userResponse : answer to satisfaction in the end of the session,
    cause the end and upload of the session
    - pinCode : pin verification with server to authentificate
    the user
*/
// eslint-disable-next-line consistent-return
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  // ASK FOR SATISFACTION
  if (msg.hasOwnProperty('userResponse')) {
    const { userResponse } = msg;
    chrome.storage.local.get(['active', 'session'], (res) => {
      const { active, session } = res;
      toggleTracker(active);
      const closedSession = closeSession(session, userResponse);
      chrome.storage.local.set({ session: closedSession }, () => {
        submitSession(closedSession);
        sendResponse({ submited: true });
      });
    });
    return true;
  // ASK FOR CERTIFICATION
  } if (msg.hasOwnProperty('pinCode')) {
    const { pinCode } = msg;
    chrome.storage.local.get(['deviceId'], (result) => {
      const { deviceId } = result;
      let certified = false;
      if (deviceId) {
        authDevice(pinCode, deviceId, (res) => {
          certified = JSON.parse(res).auth;
          chrome.storage.local.set({ certified }, () => {
            sendResponse({ certified });
            if (certified) {
              chrome.tabs.create({ url: 'http://www.google.fr' });
              chrome.action.setPopup({ popup: '' });
            }
          });
        });
      } else {
        chrome.storage.local.set({ certified: false }, () => {
          sendResponse({ certified: false });
        });
      }
    });
    return true;
  }
});

/*
  TRACKER
*/
chrome.tabs.onUpdated.addListener(
  (_, changeInfo) => {
    if (changeInfo.url) {
      chrome.storage.local.get(['active'], (result) => {
        const { active } = result;
        if (active) {
          const { url } = changeInfo;
          chrome.storage.local.get(['session'], (res) => {
            const { session } = res;
            chrome.storage.local.set({
              session: handleEntry(whitelist, whitelistDomains, url, session),
            });
          });
        }
      });
    }
  },
);
