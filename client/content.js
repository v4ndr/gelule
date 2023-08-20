/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

/*
  EXTENSION STATES :
  - REGISTER : user is not registered
    - REGISTER_SUCCESS : user has just registered
  - ASK : satisfaction survey is displayed
    - ASK_SUCCESS : user has just answered the satisfaction survey
  - INACTIVE : user is authenticated and disabled
  - ACTIVE : user is authenticated and enabled
*/

if (typeof init === 'undefined') {
  const inject = () => {
    // handle extension disconnect
    chrome.runtime.connect().onDisconnect.addListener(() => {
      (async () => {
        await chrome.runtime.sendMessage({ type: 'DISCONNECT_TAB' });
        await chrome.runtime.sendMessage({ type: 'LOG', detail: { log: 'tab disconnected' } });
      })();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    });

    // assets absolute path
    const lock = chrome.runtime.getURL('./assets/lock.png');
    const no = chrome.runtime.getURL('./assets/no.png');
    const yes = chrome.runtime.getURL('./assets/yes.png');
    const logo = chrome.runtime.getURL('./assets/logo512.png');

    // html injection
    const modal = document.createElement('div');
    modal.className = 'container';
    modal.innerHTML = `
            <!DOCTYPE html>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Abel&display=swap" rel="stylesheet">
            <style>   
                .container {
                    all: initial;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    width: "100%";
                    height: 84px;
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    margin: 0;
                    padding: 0;
                    z-index: 2147483647 !important; 
                }
                
                .title{
                    color:black;
                    font-family: 'Abel', sans-serif;
                    font-size: 16px;
                    margin: 0px 0px 0px 0px;
                    padding: 0px 0px 0px 0px;
                    text-align: left;
                    line-height: normal;
                    white-space: nowrap;
                }
                
                .subtitle{
                    color:#6B6C6E;
                    font-family: 'Abel', sans-serif;
                    font-size: 11px;
                    margin: 0px 0px 0px 0px;
                    padding: 0px 0px 0px 0px;
                    text-align: left;
                }
                
                .button {
                    background: white;
                    height: 56px;
                    width: 56px;
                    border-radius: 28px;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.25);
                    padding: 0px 0px 0px 0px;
                    margin: 0px 0px 0px 12px;
                    cursor: pointer;
                }
                
                .modal-container {
                    background: white;
                    height: 56px;
                    width: 56px;
                    min-width: 56px;
                    border-radius: 28px;
                    display: none;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.25);
                    padding: 0px 0px 0px 0px;
                    transition: width .3s ease-out;
                    cursor: pointer;
                    box-sizing: content-box;
                }
                
                .hidden-text{
                    overflow: hidden;
                    max-height: 0px;
                    max-width: 0px;
                    line-height: normal;
                    opacity:0;
                    white-space: nowrap;
                    transition: opacity .4s linear, max-width .2s ease-out, max-height .2s ease-out, margin .1s ease-out;
                }
                
                .modal-container.inactive.hover{
                    width: 240px;
                }
                
                .modal-container.active.hover{
                    width: 265px;
                }
                
                .modal-container.hover > .hidden-text{
                    opacity: 1;
                    max-height: 500px;
                    max-width: 500px;
                    margin: 0px 0px 0px 10px;
                }
                
                .modal-container.ask{
                    width:365px;
                    cursor:default;
                }
                
                .modal-container.success{
                    width:224px;
                    cursor:default;
                }
                
                .modal-container.locked{
                    width:380px;
                    cursor:default;
                }
                
                .modal-container.unlocked{
                    width:250px;
                    cursor:default;
                }
                
                .ask .title {
                    margin: 0px 12px 0px 12px;
                }
                
                
                .lock-text {
                    margin: 0px 8px 0px 16px;
                    line-height: normal;
                }
                
                .unlock-text {
                    display: none;
                    margin: 0px 8px 0px 16px;
                }
                
                .disabled-text {
                    display: none;
                }
                
                .enabled-text {
                    display: none;
                    line-height: normal;
                }
                
                .success-text {
                    display: none;
                    margin: 0px 0px 0px 12px;
                }
        
                .ask-text{
                    display: none;
                    overflow: hidden;
                    white-space: nowrap;
                }
                
                @keyframes spin {
                    0%, 10%    { transform: rotate(0deg); }
                    90%, 100%  { transform: rotate(720deg); }
                }
                
                .logo {
                    height: 30px;
                    margin: 0;
                    transition: margin .2s ease;
                }
                
                .logo.spinning {
                    animation: spin 1.2s ease infinite;
                }
                
                .form {
                    display: flex;
                    justify-content: center;
                    margin: 0px 8px 0px 8px;
                }
                
                input.input { 
                    box-sizing: border-box;
                    width: 18px;
                    height: 24px;
                    margin: 0px 3px;
                    padding: 1px 2px;
                    margin: 0px 3px;
                    border: 1px solid #333;
                    text-align: center;
                    font-family: 'Abel', sans-serif;
                    color: black;
                    font-size: 16px;
                    background-color: white;
                }
                
                .input::-webkit-outer-spin-button,
                .input::-webkit-inner-spin-button {
                    appearance: none;
                -webkit-appearance: none;
                margin: 0px;
                }
            </style>
            <div class="modal-container">
                <img class="logo" src="" alt="logo" height="30px">
                <div class="lock-text">
                    <p class="title" >Entrez votre numéro</p>
                    <p class="title" >d'anonymat :</p>
                </div>
                <form class="form" tabindex="0">
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                </form>
                <div class="unlock-text">
                    <p class="title" >Enregistrement réussie !</p>
                </div>
                <div class="hidden-text disabled-text">
                    <p class="title" >Je fais une recherche !</p>
                </div>
                <div class="hidden-text enabled-text">
                    <p class="title" >Enregistrement en cours ...</p>
                    <p class="subtitle">Cliquer pour arrêter l'enregistrement.</p>
                </div>
                <div class="ask-text">
                    <p class="title" >Êtes-vous satisfait de votre recherche ?</p>
                </div>
                <div class="success-text">
                    <p class="title" >Recherche terminée !</p>
                </div>
            </div>
            <div class="button">
                <img class="img" src=${yes} alt="logo" height="30px">
            </div>
            <div class="button">
                <img class="img" src=${no} alt="logo" height="30px">
            </div>
        `;

    // shadow root injection
    const sRoot = document.createElement('div');
    sRoot.className = 'sRoot';
    sRoot.attachShadow({ mode: 'open' });
    const r = sRoot?.shadowRoot;
    r.appendChild(modal);
    const body = document.querySelector('body');
    body?.appendChild(sRoot);

    // front state managment
    const modalContainer = r.querySelector('.modal-container');
    const unlockText = r.querySelector('.unlock-text');
    const lockText = r.querySelector('.lock-text');
    const formEle = r.querySelector('.form');
    const logoEle = r.querySelector('.logo');
    const disabledText = r.querySelector('.disabled-text');
    const enabledText = r.querySelector('.enabled-text');
    const askText = r.querySelector('.ask-text');
    const successText = r.querySelector('.success-text');
    const buttons = r.querySelectorAll('.button');

    const changeFrontStateTo = (status) => {
      (async () => {
        await chrome.runtime.sendMessage({ type: 'LOG', detail: { log: `change front status to : ${status}` } });
      })();
      logoEle.setAttribute('src', logo);
      logoEle.className = 'logo';
      modalContainer.className = 'modal-container';
      modalContainer.style.display = 'flex';
      successText.style.display = 'none';
      disabledText.style.display = 'none';
      enabledText.style.display = 'none';
      askText.style.display = 'none';
      unlockText.style.display = 'none';
      lockText.style.display = 'none';
      formEle.style.display = 'none';
      buttons.forEach((btn) => {
        btn.style.display = 'none';
      });

      switch (status) {
        case 'REGISTER':
          modalContainer.classList.add('locked', 'fixed');
          logoEle.setAttribute('src', lock);
          lockText.style.display = 'block';
          formEle.style.display = 'flex';
          break;
        case 'INACTIVE':
          modalContainer.classList.add('inactive');
          disabledText.style.display = 'block';
          break;
        case 'ACTIVE':
          modalContainer.classList.add('active');
          logoEle.classList.add('spinning');
          enabledText.style.display = 'block';
          break;
        case 'ASK':
          modalContainer.classList.add('ask', 'fixed');
          askText.style.display = 'block';
          buttons.forEach((btn) => {
            btn.style.display = 'flex';
          });
          break;
        case 'REGISTER_SUCCESS':
          modalContainer.classList.add('unlocked', 'fixed');
          logoEle.setAttribute('src', yes);
          unlockText.style.display = 'block';
          break;
        case 'ASK_SUCCESS':
          modalContainer.classList.add('success');
          logoEle.setAttribute('src', yes);
          successText.style.display = 'block';
          break;
        default:
          break;
      }
    };

    // auto input focus
    const inputs = r.querySelectorAll('.input');
    inputs.forEach((input, key) => {
      input.addEventListener('keyup', (e) => {
        if (input.value) {
          if (key === 5) {
            if (e.code !== 'ShiftRight' && e.code !== 'ShiftLeft' && e.code !== 'CapsLock') {
              const anonId = [...inputs].map((pin) => pin.value).join('');
              (async () => {
                await chrome.runtime.sendMessage({ type: 'REGISTER', detail: { anonId } });
                await chrome.runtime.sendMessage({ type: 'LOG', detail: { log: `attempt to register with anonId ${anonId}` } });
              })();
            }
          } else {
            inputs[key + 1].focus();
          }
        }
      });
    });

    // hover effects
    modalContainer.addEventListener('mouseenter', () => {
      if (!modalContainer.classList.contains('fixed')) {
        modalContainer.classList.add('hover');
      }
    });
    modalContainer.addEventListener('mouseleave', () => {
      if (!modalContainer.classList.contains('fixed')) {
        modalContainer.classList.remove('hover');
      }
    });

    // on click events
    modalContainer.addEventListener('click', () => {
      (async () => {
        await chrome.runtime.sendMessage({
          type: 'LOG',
          detail: {
            log: 'click on modal',
            // modal-container classList : ${modalContainer.classList},
            // logoEle classlist : ${logoEle.classList}, logoEle src :
            //  ${logoEle.getAttribute('src')}, modalContainer style.display :
            //  ${modalContainer.style.display}, successText style.display :
            //  ${successText.style.display}, disabledText style.display :
            //  ${disabledText.style.display}, enabledText style.display :
            //  ${enabledText.style.display}, askText style.display :
            //  ${askText.style.display}, unlockText style.display :
            //  ${unlockText.style.display}, lockText style.display :
            //  ${lockText.style.display}, formEle style.display :
            //  ${formEle.style.display}`,
          },
        });
      })();
      if (modalContainer.classList.contains('inactive')) {
        (async () => {
          await chrome.runtime.sendMessage({ type: 'SET_STATUS', detail: { status: 'ACTIVE' } });
          await chrome.runtime.sendMessage({ type: 'LOG', detail: { log: 'status send to background script : ACTIVE' } });
        })();
      } else if (modalContainer.classList.contains('active')) {
        (async () => {
          await chrome.runtime.sendMessage({ type: 'SET_STATUS', detail: { status: 'ASK' } });
          await chrome.runtime.sendMessage({ type: 'LOG', detail: { log: 'status send to background script : ASK' } });
        })();
      }
    });
    buttons.forEach((btn, key) => {
      btn.addEventListener('click', () => {
        let satisfaction;
        if (key === 0) {
          satisfaction = true;
        } else if (key === 1) {
          satisfaction = false;
        }
        (async () => {
          await chrome.runtime.sendMessage({ type: 'SET_STATUS', detail: { status: 'ASK_SUCCESS' } });
          await chrome.runtime.sendMessage({ type: 'END_SESSION', detail: { satisfaction } });
          await chrome.runtime.sendMessage({ type: 'LOG', detail: { log: 'status send to background script : ASK_SUCCESS and END_SESSION' } });
        })();
      });
    });

    // status change handler (from background script)
    chrome.runtime.onMessage.addListener((msg) => {
      const { type, detail } = msg;
      if (type === 'STATUS') {
        (async () => {
          await chrome.runtime.sendMessage({ type: 'LOG', detail: { log: `change status received from background script, status : ${detail.status}` } });
        })();
        changeFrontStateTo(detail.status);
        if (detail.status === 'REGISTER_SUCCESS') {
          const registerSuccess = new CustomEvent('register_success', {
            bubbles: true,
            composed: true,
          });
          r.dispatchEvent(registerSuccess); // send event for landing page to transition
        }
      }
    });

    // at injection get actual state from background script
    (async () => {
      await chrome.runtime.sendMessage({ type: 'GET_STATUS' });
    })();
  };
  inject();
}
