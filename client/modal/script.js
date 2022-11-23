/* eslint-disable no-undef */
$(() => {
  // ----------
  $('.gelCR23-error > #gelCR23-logo').attr('src', 'no.png');
  $('.gelCR23-error > .gelCR23-form > .gelCR23-input').css('border', '1px solid red');
  // ----------
  $('.gelCR23-container').on('mouseenter', '.gelCR23-modal-container:not(.gelCR23-fixed)', () => {
    $('.gelCR23-modal-container').addClass('gelCR23-hover');
  });
  $('.gelCR23-container').on('mouseleave', '.gelCR23-modal-container:not(.gelCR23-fixed)', () => {
    $('.gelCR23-modal-container').removeClass('gelCR23-hover');
  });
  $('body').on('click', '.gelCR23-inactive', () => {
    $('.gelCR23-modal-container').addClass('gelCR23-active');
    $('.gelCR23-modal-container').removeClass('gelCR23-inactive');
    $('.gelCR23-img').addClass('gelCR23-spinning');
    $('.gelCR23-disabled-text').hide();
    $('.gelCR23-enabled-text').show();
    $('.gelCR23-modal-container').removeClass('gelCR23-hover');
  });
  $('body').on('click', '.gelCR23-active', () => {
    $('.gelCR23-modal-container').addClass('gelCR23-ask gelCR23-fixed');
    $('.gelCR23-modal-container').removeClass('gelCR23-active gelCR23-hover');
    $('.gelCR23-img').removeClass('gelCR23-spinning');
    $('.gelCR23-enabled-text').hide();
    $('.gelCR23-ask-text').show();
    $('.gelCR23-button.gelCR23-ask').css('display', 'flex');
  });
  $('body').on('click', '.gelCR23-button.gelCR23-ask', () => {
    $('.gelCR23-modal-container').removeClass('gelCR23-ask');
    $('.gelCR23-modal-container').addClass('gelCR23-success gelCR23-fixed');
    $('.gelCR23-ask-text').hide();
    $('.gelCR23-success-text').show();
    $('.gelCR23-button.gelCR23-ask').hide();
    $('#gelCR23-logo').attr('src', 'yes.png');
    setTimeout(() => {
      $('.gelCR23-modal-container').removeClass('gelCR23-success gelCR23-fixed');
      $('.gelCR23-modal-container').addClass('gelCR23-inactive');
      $('.gelCR23-success-text').hide();
      $('.gelCR23-disabled-text').show();
      $('#gelCR23-logo').attr('src', 'logo.png');
    }, 4000);
  });
  const inputs = document.querySelectorAll('.gelCR23-input');
  inputs.forEach((input, key) => {
    input.addEventListener('keyup', (e) => {
      if (input.value) {
        if (key === 3) {
          if (e.code !== 'ShiftRight' && e.code !== 'ShiftLeft' && e.code !== 'CapsLock') {
            const pinCode = [...inputs].map((pin) => pin.value).join('');
            // eslint-disable-next-line no-console
            console.log(pinCode);
            $('#gelCR23-logo').attr('src', 'yes.png');
            $('.gelCR23-form').hide();
            $('.gelCR23-lock-text').hide();
            $('.gelCR23-unlock-text').show();
            $('.gelCR23-modal-container').removeClass('gelCR23-locked');
            $('.gelCR23-modal-container').addClass('gelCR23-unlocked');
            setTimeout(() => {
              $('.gelCR23-modal-container').removeClass('gelCR23-unlocked gelCR23-fixed');
              $('.gelCR23-modal-container').addClass('gelCR23-inactive');
              $('.gelCR23-unlock-text').hide();
              $('.gelCR23-disabled-text').show();
              $('#gelCR23-logo').attr('src', 'logo.png');
            }, 4000);
          }
        } else {
          inputs[key + 1].focus();
        }
      }
    });
  });
});
