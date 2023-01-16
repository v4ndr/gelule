/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
if (typeof init === 'undefined') {
  const inject = () => {
    // assets absolute path
    const lock = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/assets/lock.png';
    const no = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/assets/no.png';
    const yes = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/assets/yes.png';
    const logo = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/assets/logo.png';

    // html injection
    const modal = document.createElement('div');
    modal.className = 'container';
    modal.innerHTML = `
            <!DOCTYPE html>
            <style>
                @font-face {
                    font-family: 'Abel';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Abel'), url('chrome-extension://lhnafjaglgkdmiklbnhgjdjkaopfdbeo/modal/assets/Abel-Regular.woff') format('woff');    
                }
                
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
                    width:320px;
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
                    <p class="title" >Entrez votre code</p>
                    <p class="title" >de sécurité :</p>
                </div>
                <form class="form" tabindex="0">
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                </form>
                <div class="unlock-text">
                    <p class="title" >Authentification réussie !</p>
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
      const initFront = () => {
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
      };

      switch (status) {
        case 'AUTH':
          initFront();
          modalContainer.classList.add('locked', 'fixed');
          logoEle.setAttribute('src', lock);
          lockText.style.display = 'block';
          formEle.style.display = 'flex';
          break;
        case 'INACTIVE':
          initFront();
          modalContainer.classList.add('inactive');
          disabledText.style.display = 'block';
          break;
        case 'ACTIVE':
          initFront();
          modalContainer.classList.add('active');
          logoEle.classList.add('spinning');
          enabledText.style.display = 'block';
          break;
        case 'ASK':
          initFront();
          modalContainer.classList.add('ask', 'fixed');
          askText.style.display = 'block';
          buttons.forEach((btn) => {
            btn.style.display = 'flex';
          });
          break;
        case 'AUTH_SUCCESS':
          modalContainer.classList.remove('locked');
          modalContainer.classList.add('unlocked');
          logoEle.setAttribute('src', yes);
          formEle.style.display = 'none';
          lockText.style.display = 'none';
          unlockText.style.display = 'block';
          setTimeout(() => {
            modalContainer.classList.remove('unlocked', 'fixed');
            modalContainer.classList.add('inactive');
            logoEle.setAttribute('src', logo);
            unlockText.style.display = 'none';
            disabledText.style.display = 'block';
          }, 4000);
          break;
        case 'AUTH_ERROR':
          logoEle.setAttribute('src', no);
          r.querySelectorAll('.input').forEach((input) => {
            input.style.border = '1px solid red';
            input.blur();
            input.value = '';
          });
          break;
        case 'ASK_SUCCESS':
          modalContainer.classList.add('success');
          modalContainer.classList.remove('ask');
          logoEle.setAttribute('src', yes);
          askText.style.display = 'none';
          successText.style.display = 'block';
          buttons.forEach((btn) => {
            btn.style.display = 'none';
          });
          setTimeout(() => {
            modalContainer.classList.add('inactive');
            modalContainer.classList.remove('success', 'fixed');
            logoEle.setAttribute('src', logo);
            successText.style.display = 'none';
            disabledText.style.display = 'block';
          }, 4000);
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
          if (key === 3) {
            if (e.code !== 'ShiftRight' && e.code !== 'ShiftLeft' && e.code !== 'CapsLock') {
              const pinCode = [...inputs].map((pin) => pin.value).join('');
              (async () => {
                await chrome.runtime.sendMessage({ type: 'AUTH', detail: { pinCode } });
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
      if (modalContainer.classList.contains('inactive')) {
        (async () => {
          await chrome.runtime.sendMessage({ type: 'SET_STATUS', detail: { status: 'ACTIVE' } });
        })();
        changeFrontStateTo('ACTIVE');
      } else if (modalContainer.classList.contains('active')) {
        (async () => {
          await chrome.runtime.sendMessage({ type: 'SET_STATUS', detail: { status: 'ASK' } });
        })();
        changeFrontStateTo('ASK');
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
          await chrome.runtime.sendMessage({ type: 'END_SESSION', detail: { satisfaction } });
        })();
        changeFrontStateTo('ASK_SUCCESS');
      });
    });

    // messages receiver
    chrome.runtime.onMessage.addListener((msg) => {
      const { type, detail } = msg;
      switch (type) {
        case 'AUTH':
          changeFrontStateTo(detail.certified ? 'AUTH_SUCCESS' : 'AUTH_ERROR');
          break;
        case 'STATUS':
          changeFrontStateTo(detail.status);
          break;
        default:
          break;
      }
    });

    // at injection get actual state from backgroud script
    (async () => {
      await chrome.runtime.sendMessage({ type: 'GET_STATUS' });
    })();
  };
  inject();
}
