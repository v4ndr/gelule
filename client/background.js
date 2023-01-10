/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
// import handleEntry from './utils/handleEntry.js';
// import initSession from './utils/initSession.js';
// import whitelist from './utils/whitelist.js';
import closeSession from './utils/closeSession.js';
import toggleTracker from './utils/toggleTracker.js';
import uuid from './utils/uuid.js';
import submitSession from './utils/submitSession.js';
import authDevice from './utils/authDevice.js';

let status = 'unknown';

// const whitelistDomains = whitelist
//   .reduce((acc, curr) => {
//     acc.push(curr.domain);
//     return acc;
//   }, []);

chrome.runtime.onInstalled.addListener(async () => {
  let certified = null;
  chrome.storage.local.clear();
  chrome.storage.local.set({ active: false });
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

// eslint-disable-next-line consistent-return
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  const senderId = sender.tab?.id;
  const { type, detail } = msg;
  switch (type) {
    case 'GET_STATUS':
      await chrome.tabs.sendMessage(senderId, { type: 'STATUS', detail: { status } });
      break;

    case 'SET_STATUS':
      status = detail.status;
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
                status = certified ? 'INACTIVE' : 'AUTH';
                await chrome.tabs.sendMessage(senderId, { type: 'AUTH', detail: { certified } });
              }
            });
          });
        } else {
          chrome.storage.local.set({ certified: false }, async () => {
            status = 'AUTH';
            await chrome.tabs.sendMessage(senderId, { type: 'AUTH', detail: { certified: false } });
          });
        }
      });
      break;

    case 'END_SESSION':
      status = 'INACTIVE';
      chrome.storage.local.get(['active', 'session'], (res) => {
        const { active, session } = res;
        toggleTracker(active);
        const closedSession = closeSession(session, detail.satisfaction);
        chrome.storage.local.set({ session: closedSession }, () => {
          submitSession(closedSession);
          sendResponse({ submited: true });
        });
      });
      break;

    default:
      break;
  }

  // chrome.action.onClicked.addListener(
  //   () => {
  //     chrome.storage.local.get(['active', 'deviceId', 'certified'], (result) => {
  //       const { active, deviceId, certified } = result;
  //       if (certified) {
  //         toggleTracker(active);
  //         if (!active) {
  //           chrome.storage.local.set({ session: initSession(deviceId) }, () => {
  //           });
  //         }
  //       }
  //     });
  //   },
  // );

  // chrome.tabs.onUpdated.addListener(
  //   (_, changeInfo) => {
  //     if (changeInfo.url) {
  //       chrome.storage.local.get(['active'], (result) => {
  //         const { active } = result;
  //         if (active) {
  //           const { url } = changeInfo;
  //           chrome.storage.local.get(['session'], (res) => {
  //             const { session } = res;
  //             chrome.storage.local.set({
  //               session: handleEntry(whitelist, whitelistDomains, url, session),
  //             });
  //           });
  //         }
  //       });
  //     }
  //   },
  // );
});
