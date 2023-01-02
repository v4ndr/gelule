const lock = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/lock.png'
const logo = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/logo.png'
const no = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/no.png'
const yes = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/yes.png'
/* eslint-disable no-undef */
$(() => {
    // ----------
    $('.error > .logo').attr('src', no);
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
      $('.logo').addClass('spinning');
      $('.disabled-text').hide();
      $('.enabled-text').show();
      $('.modal-container').removeClass('hover');
    });
    $('body').on('click', '.active', () => {
      $('.modal-container').addClass('ask fixed');
      $('.modal-container').removeClass('active hover');
      $('.logo').removeClass('spinning');
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
      $('.logo').attr('src', yes);
      setTimeout(() => {
        $('.modal-container').removeClass('success fixed');
        $('.modal-container').addClass('inactive');
        $('.success-text').hide();
        $('.disabled-text').show();
        $('.logo').attr('src', logo);
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
              $('.logo').attr('src', yes);
              $('.form').hide();
              $('.lock-text').hide();
              $('.unlock-text').show();
              $('.modal-container').removeClass('locked');
              $('.modal-container').addClass('unlocked');
              setTimeout(() => {
                  // chrome.runtime.sendMessage({status:"collapse"});
                  $('.modal-container').removeClass('unlocked fixed');
                  $('.modal-container').addClass('inactive');
                  $('.unlock-text').hide();
                  $('.disabled-text').show();
                  $('.logo').attr('src', logo);
                }, 4000);
              }
          } else {
            inputs[key + 1].focus();
          }
        }
      });
    });
  });