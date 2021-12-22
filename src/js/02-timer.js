import Notiflix from 'notiflix';
// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

let t = null;
let timeApp = null;
let idTimer = null;

const refs = {
  dateTimePickr: document.querySelector('input#datetime-picker'),
  startTimer: document.querySelector('button[data-start]'),
  seconds: document.querySelector('.value[data-seconds]'),
  minutes: document.querySelector('.value[data-minutes]'),
  hours: document.querySelector('.value[data-hours]'),
  days: document.querySelector('.value[data-days]'),
};

refs.startTimer.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = new Date();
    t = selectedDates[0];
    timeApp = t - currentDate;

    if (timeApp >= 0) {
      refs.startTimer.disabled = false;
      refs.startTimer.addEventListener('click', onStartClick);
    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};

flatpickr(refs.dateTimePickr, options);

refs.startTimer.addEventListener('click', onStartClick);

function onStartClick(e) {
  idTimer = setInterval(() => {
    let currentDateNow = new Date();
    let timeApp1 = t - currentDateNow;
    let minus = convertMs(timeApp1);

    refs.days.textContent = minus.days;
    refs.hours.textContent = addZero(minus.hours);
    refs.minutes.textContent = addZero(minus.minutes);
    refs.seconds.textContent = addZero(minus.seconds);
    refs.startTimer.disabled = true;
    if (
      refs.days.textContent === '0' &&
      refs.hours.textContent === '0' &&
      refs.minutes.textContent === '0' &&
      refs.seconds.textContent === '0'
    ) {
      clearInterval(idTimer);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return String(value).padStart(2, '0');
}
