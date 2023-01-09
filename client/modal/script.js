const r = document.querySelector('.sRoot').shadowRoot;

// hover effects
const modalContainer = r.querySelector('.modal-container');
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

// auto input focus
const inputs = r.querySelectorAll('.input');
inputs.forEach((input, key) => {
  input.addEventListener('keyup', (e) => {
    if (input.value) {
      if (key === 3) {
        if (e.code !== 'ShiftRight' && e.code !== 'ShiftLeft' && e.code !== 'CapsLock') {
          const pinCode = [...inputs].map((pin) => pin.value).join('');
          const gelCR23Evt = new CustomEvent('gelCR23Evt', {
            detail: { pinCode },
            bubbles: false,
            cancelable: false,
            composed: false,
          });
          document.dispatchEvent(gelCR23Evt);
        }
      } else {
        inputs[key + 1].focus();
      }
    }
  });
});
