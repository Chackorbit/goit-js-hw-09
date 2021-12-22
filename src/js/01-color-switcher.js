// const start = document.querySelector('button[data-start]');
// const stop = document.querySelector('button[data-stop]');

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

console.log(refs.start);
console.log(refs.stop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let interval = null;

refs.start.addEventListener('click', onStart);

refs.stop.addEventListener('click', onStop);

function onStart() {
  console.log('Start');
  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.start.disabled = true;
}

function onStop() {
  console.log('Stop');
  clearInterval(interval);
  refs.start.disabled = false;
}
