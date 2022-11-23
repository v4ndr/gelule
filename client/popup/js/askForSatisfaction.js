/* eslint-disable no-undef */
$(() => {
  $('#yesButton').click(() => {
    chrome.runtime.sendMessage({ userResponse: true }, (res) => {
      if (res.submited) {
        window.close();
      }
    });
  });
  $('#noButton').click(() => {
    chrome.runtime.sendMessage({ userResponse: false }, (res) => {
      if (res.submited) {
        window.close();
      }
    });
  });
});
