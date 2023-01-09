/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
if (typeof init === 'undefined') {
  const inject = () => {
    // assets absolute path
    const lock = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/lock.png';
    const no = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/no.png';
    const yes = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/yes.png';
    const logo = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/logo.png';

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
                    display: flex;
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
                    display: flex;
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
                
                .button.ask {
                    display: none;
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
            <div class="modal-container locked fixed">
                <img class="logo" src=${lock} alt="logo" height="30px">
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
            <div class="button ask">
                <img class="img" src=${yes} alt="logo" height="30px">
            </div>
            <div class="button ask">
                <img class="img" src=${no} alt="logo" height="30px">
            </div>
        `;

    // shadow root injection
    const sRoot = document.createElement('div');
    sRoot.className = 'sRoot';
    sRoot.attachShadow({ mode: 'open' });

    /*
        inject JS in shadow dom
    */
    if (sRoot?.shadowRoot) {
      sRoot.shadowRoot.appendChild(modal);
      const modalJs = document.createElement('script');
      modalJs.src = chrome.runtime.getURL('modal/script.js');
      sRoot.shadowRoot.appendChild(modalJs);
    }
    const body = document.querySelector('body');
    body?.appendChild(sRoot);

    // messages handler
    // from injected script (user interaction)
    document.addEventListener('gelCR23Evt', (evt) => {
      const { pinCode } = evt.detail;
      (async () => {
        await chrome.runtime.sendMessage({ pinCode });
      })();
    });

    // message passing with background script
    const r = sRoot.shadowRoot;

    const changeStatusTo = (status) => {
      switch (status) {
        case 'AUTH_ERROR':
          r.querySelector('.logo').setAttribute('src', no);
          r.querySelectorAll('.input').forEach((input) => {
            input.style.border = '1px solid red';
            input.blur();
            input.value = '';
          });
          break;
        case 'AUTH_SUCCESS':
          r.querySelector('.logo').setAttribute('src', yes);
          r.querySelector('.form').style.display = 'none';
          r.querySelector('.lock-text').style.display = 'none';
          r.querySelector('.unlock-text').style.display = 'block';
          r.querySelector('.modal-container').classList.remove('locked');
          r.querySelector('.modal-container').classList.add('unlocked');
          setTimeout(() => {
            r.querySelector('.modal-container').classList.remove('unlocked');
            r.querySelector('.modal-container').classList.remove('fixed');
            r.querySelector('.unlock-text').style.display = 'none';
            r.querySelector('.modal-container').classList.add('inactive');
            r.querySelector('.disabled-text').style.display = 'block';
            r.querySelector('.logo').setAttribute('src', logo);
          }, 4000);
          break;
        case 'INACTIVE':
          break;
        default:
          break;
      }
    };

    chrome.runtime.onMessage.addListener((msg) => {
      const { certified } = msg;
      if (!certified) {
        changeStatusTo('AUTH_ERROR');
      } else {
        changeStatusTo('AUTH_SUCCESS');
      }
    });
  };
  inject();
}

// sucess autb
/*
r.querySelector('.logo').setAttribute('src', yes);
          r.querySelector('.form').style.display = 'none';
          r.querySelector('.lock-text').style.display = 'none';
          r.querySelector('.unlock-text').style.display = 'block';
          r.querySelector('.modal-container').classList.remove('locked');
          r.querySelector('.modal-container').classList.add('unlocked');
          setTimeout(() => {
            r.querySelector('.modal-container').classList.remove('unlocked');
            r.querySelector('.modal-container').classList.remove('fixed');
            r.querySelector('.modal-container').classList.add('inactive');
            r.querySelector('.unlock-text').style.display = 'none';
            r.querySelector('.disabled-text').style.display = 'block';
            r.querySelector('.logo').setAttribute('src', logo);
          }, 4000);
*/
