/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
const inputs = document.querySelectorAll('input');
const error = document.getElementsByClassName('error');

inputs.forEach((input, key) => {
  if (key !== 0) {
    input.addEventListener('click', () => {
      inputs[0].focus();
    });
  }
  input.addEventListener('keyup', (e) => {
    if (input.value) {
      if (key === 3) {
        if (e.code !== 'ShiftRight' && e.code !== 'ShiftLeft' && e.code !== 'CapsLock') {
          const pinCode = [...inputs].map((pin) => pin.value).join('');
          chrome.runtime.sendMessage({ pinCode }, (res) => {
            if (res.hasOwnProperty('certified')) {
              const { certified } = res;
              if (certified) {
                window.close();
              } else {
                inputs.forEach((ele) => {
                  // eslint-disable-next-line no-param-reassign
                  ele.value = '';
                  inputs[0].focus();
                  error[0].innerHTML = 'Le code est invalide.';
                });
              }
            }
          });
        }
      } else {
        inputs[key + 1].focus();
      }
    }
  });
});
