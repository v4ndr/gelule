/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import initSession from './utils/initSession.js';
import closeSession from './utils/closeSession.js';
import submitSession from './utils/submitSession.js';
import handleEntry from './utils/handleEntry.js';
import whitelist from './utils/whitelist.js';
import saveLog from './utils/saveLog.js';
import sendMsgToAllTabs from './utils/sendMsgToAllTabs.js';

setInterval(() => {
  console.log('heartbeat');
}, 55000);

let status = 'unknown';
let anonId = null;
let session = {};
let timeoutId = null;
let side = 'right';

const whitelistDomains = whitelist
  .reduce((acc, curr) => {
    acc.push(curr.domain);
    return acc;
  }, []);

saveLog(`background.js loaded with status ${status} and anonId ${anonId}`);

chrome.runtime.onInstalled.addListener(async () => {
  chrome.tabs.create({ url: 'https://www.gelule.vandr.fr/landing.html' });
  chrome.contextMenus.create({
    type: 'separator',
    contexts: ['all'],
    id: 'gelule-menu',
    title: 'Gélule',
  }, (id) => {
    chrome.contextMenus.create({
      id: 'gelule-move',
      contexts: ['all'],
      parentId: id,
      title: 'Déplacer Gélule de l\'autre côté',
    });
    chrome.contextMenus.create({
      id: 'gelule-reload',
      contexts: ['all'],
      parentId: id,
      title: 'En cas de problème, cliquez ici',
    });
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === 'gelule-move') {
    side = side === 'right' ? 'left' : 'right';
    await sendMsgToAllTabs({ type: 'MOVE', detail: { side } });
    chrome.storage.local.set({ side });
  } else if (info.menuItemId === 'gelule-reload') {
    chrome.runtime.openOptionsPage();
  }
});

chrome.storage.local.get(['anonId'], async (res) => {
  if (res.hasOwnProperty('anonId')) {
    saveLog(`anonId retrieved from storage : ${res.anonId}`);
    status = res.anonId ? 'INACTIVE' : 'REGISTER';
    saveLog(`status set to ${status}`);
    anonId = res.anonId;
  } else {
    status = 'REGISTER';
    saveLog(`anonId not found in storage, status set to ${status}`);
  }

  const sideObj = await chrome.storage.local.get(['side']);
  if (sideObj.hasOwnProperty('side')) {
    side = sideObj.side;
  }

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

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const { type, detail } = msg;
    const { tab } = sender;

    switch (type) {
      case 'GET_STATUS':
        sendResponse({ type: 'STATUS', detail: { status } });
        saveLog(`status asked by content script, status <${status}> sent to tab ${tab.id}}`);
        break;

      case 'GET_SIDE':
        sendResponse({ type: 'MOVE', detail: { side } });
        saveLog(`side asked by content script, side <${side}> sent to tab ${tab.id}}`);
        break;

      case 'SET_STATUS':
        status = detail.status;
        (async () => {
          await sendMsgToAllTabs({ type: 'STATUS', detail: { status } });
        })();
        if (detail.status === 'ACTIVE') {
          timeoutId = setTimeout(() => {
            session = {};
            status = 'INACTIVE';
            sendResponse({ type: 'STATUS', detail: { status } });
            timeoutId = null;
            saveLog(`Session ended after 15 minutes and status set to ${status}`);
          }, 900000);
          session = initSession(anonId);
        } else if (detail.status === 'ASK_SUCCESS') {
          setTimeout(async () => {
            status = 'INACTIVE';
            await sendMsgToAllTabs({ type: 'STATUS', detail: { status } });
          }, 4000);
        }
        saveLog(`SET_STATUS received from content script, status set to ${status}`);
        break;

      case 'REGISTER':
        anonId = detail.anonId;
        chrome.storage.local.set({ anonId }, async () => {
          saveLog(`anonId saved in storage : ${anonId}`);
          status = 'REGISTER_SUCCESS';
          await sendMsgToAllTabs({ type: 'STATUS', detail: { status } });
          setTimeout(async () => {
            status = 'INACTIVE';
            await sendMsgToAllTabs({ type: 'STATUS', detail: { status } });
          }, 4000);
        });
        break;

      case 'END_SESSION':
        saveLog('end');
        saveLog(`Session ended with satisfaction ${detail.satisfaction} and submitted from background script`);
        (async () => {
          await submitSession(closeSession(session, detail.satisfaction));
        })();
        clearTimeout(timeoutId);
        timeoutId = null;
        break;

      case 'LOG':
        saveLog(detail.log);
        break;

      case 'DISCONNECT':
        saveLog('Port disconnected');
        (async () => {
          await sendMsgToAllTabs({ type: 'RESET' });
        })();
        break;

      default:
        break;
    }
  });
});
