const lock = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/lock.png'
const logo = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/logo.png'
const no = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/no.png'
const yes = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/yes.png'

const r = document.querySelector('.sRoot').shadowRoot;
const inputs = r.querySelectorAll('.input');
inputs.forEach((input, key) => {
  input.addEventListener('keyup', (e) => {
    if (input.value) {
      if (key === 3) {
        if (e.code !== 'ShiftRight' && e.code !== 'ShiftLeft' && e.code !== 'CapsLock') {
          const pinCode = [...inputs].map((pin) => pin.value).join('');
          const gelCR23Evt = new CustomEvent("gelCR23Evt", {
            detail: {pinCode},
            bubbles: false,
            cancelable: false,
            composed: false,
          });
          document.dispatchEvent(gelCR23Evt);
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
          }
      } else {
        inputs[key + 1].focus();
      }
    }
  });
});