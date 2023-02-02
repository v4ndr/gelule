const valueDisplays = document.querySelectorAll('.counter');
const interval = 400;
valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  const endValue = parseInt(valueDisplay.getAttribute('data-val'), 10);
  const duration = Math.floor(interval / endValue);
  const counter = setInterval(() => {
    startValue += 1;
    // eslint-disable-next-line no-param-reassign
    valueDisplay.textContent = startValue;
    if (startValue === endValue) {
      clearInterval(counter);
    }
  }, duration);
});
