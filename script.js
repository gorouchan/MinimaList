'use strict';

const taskInputText = document.querySelector('.task--input');
const taskBtn = document.querySelector('.task--btn');
const taskList = document.querySelector('.task--list');
const taskItems = document.querySelectorAll('.task--item');

const todoItem = document.querySelector('.todo--item');
const todoBtn = document.querySelectorAll('.todo--btn');
const todoList = [
  `I'm going for a walk with cocoa-chan at 6:00PM`,
  `I'm gonna see Avatar 2 with Sophia`,
  'Finish homeworks by Friday',
];
const tasksMain = function () {
  //COUNT TODO ITEMS
  let items = 0;
  const taskCount = function () {
    items = 0;
    document.querySelectorAll('.task--item').forEach(() => items++);
    document.querySelector('h1').textContent = `You have ${items} ${
      items <= 1 ? 'task' : 'tasks'
    } today`;
  };

  // DELETE TODO ITEM
  const delTodo = function () {
    document.querySelectorAll('.todo--btn').forEach(btn =>
      btn.addEventListener('click', function (e) {
        const todoItemEl = e.target.closest('.task--item');
        e.target.closest('.task--item').classList.remove('show');
        setTimeout(() => {
          todoItemEl.remove();
          items--;
          taskCount();
        }, 650);
      })
    );
  };

  const fadeOut = function () {
    setTimeout(() => {
      document
        .querySelectorAll('.task--item')
        .forEach(task => task.classList.add('show'));
    }, 15);
  };
  fadeOut();
  //ADD TASK WITH BUTTON OR ENTER KEYS
  const addTask = function () {
    if (taskInputText.value === '') return;
    const inputText = taskInputText.value;
    todoList.push(inputText);
    setTimeout(() => {
      taskList.insertAdjacentHTML(
        'afterbegin',
        `<div class='task--item '><p class="todo--item">${inputText}</p><button class="todo--btn"><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></div>`
      );
      taskCount();
      delTodo();
    }, 15);
    setTimeout(() => {
      fadeOut();
    }, 15);

    taskCount();
    taskInputText.value = '';
  };
  const inputBtn = taskBtn.addEventListener('click', addTask);
  const enterTask = window.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTask();
  });

  // SHOW THE TODO LIST IN EXISTING ARRAY
  const showTodo = function () {
    todoList.forEach(todo => {
      taskList.insertAdjacentHTML(
        'afterbegin',
        `<div class='task--item ' ><p class="todo--item">${todo}</p><button class="todo--btn"><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></div>`
      );
    });
    taskCount();
    delTodo();
  };
  showTodo();
  taskCount();

  let timer;
  taskInputText.addEventListener('input', function () {
    const taskBar = document.querySelector('.task');
    taskBar.classList.add('hover');
    clearTimeout(timer);
    timer = setTimeout(() => {
      taskBar.classList.remove('hover');
    }, 2500);
  });
};
tasksMain();

// DATE
const getDate = () => {
  const date = new Date();
  const newDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(date);
  return (document.querySelector('.date').textContent = newDate
    .slice(0, -6)
    .toUpperCase());
};
getDate();

//SETTINGS POPUP
const settingsIcon = document.querySelector('.settings--icon');
const settingsPopup = document.querySelector('.settings--popup');
const html = document.querySelector('html');
const overlay = document.querySelector('.overlay');

const header = document.querySelector('header');
const body = document.querySelector('body');

const settingsOpen = settingsIcon.addEventListener('click', function () {
  settingsPopup.classList.remove('hidden');
  settingsPopup.style.cssText = `animation:slide-in 1s ease;
      animation-fill-mode: forwards;`;
  body.style.transform = 'translateX(-25%)';
  overlay.classList.remove('hidden');
});

const settingsClose = window.addEventListener('click', function (e) {
  if (e.target === overlay) {
    settingsPopup.style.cssText = `animation:slide-out 1s ease;
            animation-fill-mode: forwards;`;
    body.style.transform = 'translateX(0%)';
    overlay.classList.add('hidden');
    setTimeout(() => {
      settingsPopup.classList.add('hidden');
    }, 500);
  }
});

// BACKGROUND CHANGE

const figures = document.querySelectorAll('.figure');

figures.forEach(figure =>
  figure.addEventListener('click', function (e) {
    if (e.target.classList.contains('bg--img')) {
      body.style.filter = 'blur(5px)';
      setTimeout(() => {
        body.style.filter = '';
        html.style.backgroundImage = `url(${e.target.src})`;
      }, 1000);
    }
  })
);
