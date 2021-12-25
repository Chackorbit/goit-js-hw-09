//Импортируем библиотеки
import Notiflix from 'notiflix';
import '../../node_modules/notiflix/dist/notiflix-3.2.2.min.css';
// получаем доступ к элементам разметки
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  button: document.querySelector('button'),
};

// Вешаем слушателя события
refs.form.addEventListener('submit', onFormClick);

// Создаём функцию для события
function onFormClick(e) {
  e.preventDefault();

  // обьявляем переменные и присваиваем им значения импута Только числа
  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);
  let timeout = delay;
  let position = 0;

  console.log(`Задержка перед срабатыванием: ${delay}`);
  console.log(`Задержка до следующего срабатывания: ${step}`);
  console.log(`Сколько срабатываний: ${amount}`);

  // Создаём функцию которая будет создавать и возвращать нам промис
  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    if (position === 1) {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldResolve) {
            resolve(position, delay);
          } else {
            reject(position, delay);
          }
        }, timeout);
      });
      return promise;
    } else {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldResolve) {
            resolve(position, delay);
          } else {
            reject(position, delay);
          }
        }, (timeout += step));
      });
      return promise;
    }
  }

  // Вызываем функцию создания промисов и вывода уведомлений всех значений импутов по порядку
  setTimeout(() => {
    // через цикл For() перебираем сколько раз нам нужно создать промис
    for (let position = 1; position <= amount; position += 1) {
      if (position === 1) {
        createPromise(position, delay)
          .then(() => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(() => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      } else {
        createPromise(position, delay)
          .then(() => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${(delay += step)}ms`);
          })
          .catch(() => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${(delay += step)}ms`);
          });
      }
    }
  }, 0);
}
