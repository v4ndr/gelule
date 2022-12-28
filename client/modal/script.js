const changeStatusTo = (newStatus) => {
  var data = { type: "STATUS_CHANGE", text: newStatus };
  window.postMessage(data, "*");
}
/* eslint-disable no-undef */
$(() => {
  // ----------
  $('.error > .logo').attr('src', './assets/no.png');
  $('.error > .form > .input').css('border', '1px solid red');
  // ----------
  $('.container').on('mouseenter', '.modal-container:not(.fixed)', () => {
    $('.modal-container').addClass('hover');
  });
  $('.container').on('mouseleave', '.modal-container:not(.fixed)', () => {
    $('.modal-container').removeClass('hover');
  });
  $('body').on('click', '.inactive', () => {
    $('.modal-container').addClass('active');
    $('.modal-container').removeClass('inactive');
    $('.img').addClass('spinning');
    $('.disabled-text').hide();
    $('.enabled-text').show();
    $('.modal-container').removeClass('hover');
  });
  $('body').on('click', '.active', () => {
    $('.modal-container').addClass('ask fixed');
    $('.modal-container').removeClass('active hover');
    $('.img').removeClass('spinning');
    $('.enabled-text').hide();
    $('.ask-text').show();
    $('.button.ask').css('display', 'flex');
  });
  $('body').on('click', '.button.ask', () => {
    $('.modal-container').removeClass('ask');
    $('.modal-container').addClass('success fixed');
    $('.ask-text').hide();
    $('.success-text').show();
    $('.button.ask').hide();
    $('.logo').attr('src', './assets/yes.png');
    setTimeout(() => {
      $('.modal-container').removeClass('success fixed');
      $('.modal-container').addClass('inactive');
      $('.success-text').hide();
      $('.disabled-text').show();
      $('.logo').attr('src', './assets/logo.png');
    }, 4000);
  });
  const inputs = document.querySelectorAll('.input');
  inputs.forEach((input, key) => {
    input.addEventListener('keyup', (e) => {
      if (input.value) {
        if (key === 3) {
          if (e.code !== 'ShiftRight' && e.code !== 'ShiftLeft' && e.code !== 'CapsLock') {
            const pinCode = [...inputs].map((pin) => pin.value).join('');
            // eslint-disable-next-line no-console
            console.log(pinCode);
            $('.logo').attr('src', './Assets/yes.png');
            $('.form').hide();
            $('.lock-text').hide();
            $('.unlock-text').show();
            $('.modal-container').removeClass('locked');
            $('.modal-container').addClass('unlocked');
            changeStatusTo("unlock");
            setTimeout(() => {
                // chrome.runtime.sendMessage({status:"collapse"});
                $('.modal-container').removeClass('unlocked fixed');
                $('.modal-container').addClass('inactive');
                $('.unlock-text').hide();
                $('.disabled-text').show();
                $('.logo').attr('src', './assets/logo.png');
              }, 4000);
            }
        } else {
          inputs[key + 1].focus();
        }
      }
    });
  });
});
