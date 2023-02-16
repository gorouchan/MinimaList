'use strict';

const taskInputText = document.querySelector('.task--input');
const taskBtn = document.querySelector('.task--btn');
const taskList = document.querySelector('.task--list');
const taskItems = document.querySelectorAll('.task--item');
const taskBox = document.querySelector('.task');

const settingsFooter = document.querySelector('.footer');

const toggleContainer = document.querySelector('.toggle');
const toggleBackground = document.querySelector('.toggle--container');
const toggleBall = document.querySelector('.toggle--ball');

const todoItem = document.querySelector('.todo--item');
const todoBtn = document.querySelectorAll('.todo--btn');
let todoList = JSON.parse(localStorage.getItem('todo--items')) || [];

const todoStorage = () => {
  localStorage.setItem('todo--items', JSON.stringify(todoList));
  console.log(todoList);
};
console.log(todoList);
let light;
let dark = true;
let lightOrDark;
let toggleActive;
let clock;

// const tasksMain = function () {
//COUNT TODO ITEMS
let items = 0;
const taskCount = function () {
  items = 0;
  document.querySelectorAll('.task--item').forEach(() => items++);
  document.querySelector('h1').textContent = `You have ${items} ${
    items <= 1 ? 'task' : 'tasks'
  } today`;
};
const titleUpdate = () => {
  document.title = `${items} ${items <= 1 ? 'task' : 'tasks'} today`;
};
titleUpdate();
// DELETE TODO ITEM
const delTodo = function () {
  document.querySelectorAll('.todo--btn').forEach((btn, i) =>
    btn.addEventListener('click', function (e) {
      const todoItemEl = e.target.closest('.task--item');
      todoList = todoList.filter(item => item != todoItemEl.textContent);
      e.target.closest('.task--item').classList.remove('show');

      setTimeout(() => {
        todoItemEl.remove();
        items--;
        taskCount();
        titleUpdate();
        todoStorage();
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
      `<div class='task--item '><p class="todo--item">${inputText}</p><button class="todo--btn"><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="${
        dark ? 'black' : 'white'
      }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></div>`
    );
    taskCount();
    titleUpdate();
    delTodo();
    todoStorage();
    //ADD FOCUS TO TEXTAREA AFTER ADDING A TASK
    taskInputText.focus();
    // COPYING FROM lightOrDark() so it's not too CPU extensive
    document
      .querySelectorAll('.todo--item')
      .forEach(item => (item.style.color = light ? 'white' : 'black'));
    document
      .querySelectorAll('.task--item')
      .forEach(
        task => (task.style.backgroundColor = light ? '#212121' : 'white')
      );
  }, 15);
  setTimeout(() => {
    fadeOut();
  }, 15);

  taskCount();
  titleUpdate();
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
      `<div class='task--item ' ><p class="todo--item">${todo}</p><button class="todo--btn"><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="${
        dark ? 'black' : 'white'
      }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></div>`
    );
  });
  taskCount();
  delTodo();
  titleUpdate();
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
// };
// tasksMain();

// DATE AND TIME

const getTime = () => {
  const time = new Date();
  const h = time.getHours() % 12 || 12;
  const m = String(time.getMinutes()).padStart(2, 0);
  const s = String(time.getSeconds()).padStart(2, 0);

  return `${h}:${m}:${s} ${time.getHours() >= 12 ? 'PM' : 'AM'}`;
};
getTime();
const getDate = () => {
  const date = new Date();
  const newDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  })
    .format(date)
    .slice(0, -6)
    .toUpperCase();
  return clock
    ? (document.querySelector('.date').textContent = `${newDate} `)
    : (document.querySelector('.date').textContent = `${newDate} ${getTime()}`);
};
getDate();
let clockUpdate = setInterval(() => {
  getDate();
}, 1000);

//SETTINGS POPUP
const settingsConfig = function () {
  const settingsIcon = document.querySelector('.settings--icon');
  const settingsPopup = document.querySelector('.settings--popup');
  const overlay = document.querySelector('.overlay');
  const body = document.querySelector('body');

  const settingsOpen = settingsIcon.addEventListener('click', function () {
    settingsPopup.classList.remove('hidden');
    settingsPopup.style.animation = 'slide-in 1s ease';
    settingsPopup.style.animationFillMode = 'forwards';
    body.style.transform = 'translateX(-500px)';
    overlay.classList.remove('hidden');
  });

  const settingsClose = window.addEventListener('click', function (e) {
    if (e.target === overlay) {
      settingsPopup.style.animation = 'slide-out 1s ease;';
      settingsPopup.style.animationFillMode = 'forwards';

      body.style.transform = 'translateX(0%)';
      overlay.classList.add('hidden');
      setTimeout(() => {
        settingsPopup.classList.add('hidden');
      }, 500);
    }
  });
};
settingsConfig();

// CHANGE THEMES ICON ACTIVE

const modes = document.querySelectorAll('.mode');

const themeActiveReset = () => {
  modes.forEach(theme => theme.classList.remove('theme--active--dark'));
  modes.forEach(theme => theme.classList.remove('theme--active--light'));
};

modes.forEach(theme =>
  theme.addEventListener('click', function (e) {
    const targetBtn = e.target.closest('button');
    themeActiveReset();
    targetBtn.classList.contains('night--mode')
      ? targetBtn.classList.add('theme--active--dark')
      : targetBtn.classList.add('theme--active--light');
  })
);

// CHANGE NIGHT MODE OR LIGHT MODE

const html = document.querySelector('html');
const htmlBackground = document.querySelector('.html--bg');
const settingsMenu = document.querySelector('.settings--popup');

const nightMode = document.querySelector('.night--mode');
const lightMode = document.querySelector('.light--mode');
const themeContainer = document.querySelector('.theme--container');
const themeActiveDark = document.querySelector('.theme--active--dark');
const themeActiveLight = document.querySelector('.theme--active--light');

const clockText = document.querySelector('.clock--text');
const settingsHeader = document.querySelector('.settings--header');
const pexelsDisclaimer = document.querySelector('.disclaimer');
const themeHeader = document.querySelector('.theme--header');
const galleryHeader = document.querySelector('.gallery--header');
const svg = document.querySelectorAll('.svg--alter');
const dateHeader = document.querySelector('.date');
const taskHeader = document.querySelector('h1');
const themeDescription = document.querySelector('.theme--description');
const sliderBtn = document.querySelector('.slider--btn');
const css = document.createElement('style');

const changeCSS = () => {
  css.innerHTML = `.task--input::placeholder{color:${
    light ? 'white' : 'black'
  };}`;
  document.body.append(css);
};

////// THEME SELECTOR HOVER DESCRIPTION ///////
const uploadIcon = document.querySelector('.gallery--mode');
const uploadDescription = document.querySelector('.upload--description');
const lightIcon = document.querySelector('.light--mode');
const lightDescription = document.querySelector('.light--description');
const darkIcon = document.querySelector('.night--mode');
const darkDescription = document.querySelector('.dark--description');
const toggleDescription = document.querySelector('.toggle--description');
const suggestions = document.querySelector('.suggestions');
// Upload Icon Description
uploadIcon.addEventListener('mouseenter', () =>
  uploadDescription.classList.add('description--active')
);
uploadIcon.addEventListener('mouseleave', () =>
  uploadDescription.classList.remove('description--active')
);
// Light mode Icon Description
lightIcon.addEventListener('mouseenter', () =>
  lightDescription.classList.add('description--active')
);
lightIcon.addEventListener('mouseleave', () =>
  lightDescription.classList.remove('description--active')
);
// Dark mode Icon Description
darkIcon.addEventListener('mouseenter', () =>
  darkDescription.classList.add('description--active')
);
darkIcon.addEventListener('mouseleave', () =>
  darkDescription.classList.remove('description--active')
);

lightOrDark = () => {
  settingsMenu.style.backgroundColor = light ? '#F7F6F2' : 'rgb(21,21,21)';
  themeContainer.style.backgroundColor = light ? '#ECE8DD' : 'rgb(41, 41, 41)';
  taskBox.style.backgroundColor = light ? '#212121' : 'white';
  taskInputText.style.color = light ? 'white' : 'black';

  settingsHeader.style.color = light ? 'black' : 'white';
  settingsFooter.style.color = light ? 'black' : 'white';
  pexelsDisclaimer.style.color = light ? 'black' : 'white';
  themeHeader.style.color = light ? 'black' : 'white';
  galleryHeader.style.color = light ? 'black' : 'white';
  dateHeader.style.color = light ? 'black' : 'white';
  taskHeader.style.color = light ? 'black' : 'white';
  themeDescription.style.color = light ? 'black' : 'white';
  toggleDescription.style.color = light ? 'black' : 'white';
  suggestions.style.color = light ? 'black' : 'white';
  clockText.style.color = light ? 'black' : 'white';

  changeCSS();

  document
    .querySelectorAll('a')
    .forEach(
      link => (link.style.color = light ? 'rgb(168, 100, 54)' : 'wheat')
    );

  document.querySelector('.feather-corner-down-left').style.stroke = light
    ? 'white'
    : 'black';
  document
    .querySelectorAll('.feather-trash-2')
    .forEach(btn => (btn.style.stroke = light ? 'white' : 'black'));
  document
    .querySelectorAll('.svg--alter')
    .forEach(btn => (btn.style.stroke = light ? 'black' : 'white'));
  document
    .querySelectorAll('.todo--item')
    .forEach(item => (item.style.color = light ? 'white' : 'black'));
  document
    .querySelectorAll('.task--item')
    .forEach(
      task => (task.style.backgroundColor = light ? '#212121' : 'white')
    );

  //// BACKGROUND
  if (toggleActive) return;
  htmlBackground.style.filter = 'blur(10px)';
  htmlBackground.src = light
    ? 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg'
    : 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg';
  htmlBackground.addEventListener(
    'load',
    () => (htmlBackground.style.filter = '')
  );
};

lightMode.addEventListener('click', () => {
  light = true;
  dark = false;
  lightOrDark();
});
nightMode.addEventListener('click', () => {
  dark = true;
  light = false;
  lightOrDark();
});

/////////  CHANGE BACKGROUND /////////////
const sliderContainer = document.querySelector('.slider--container');
const slides = document.querySelectorAll('.slider--img');
const btnRight = document.querySelector('.next--slide');
const btnLeft = document.querySelector('.prev--slide');
// sliderContainer.insertAdjacentHTML(
//   'beforeend',
//   `<img src='https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg' data-img='https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg' class='slider--img slider--${
//     slides.length + 1
//   }'>`
// );
const loadSlides = () => {
  slides.forEach(img =>
    img.addEventListener('click', function (e) {
      const imgSource = e.target.dataset.img;
      htmlBackground.style.filter = 'blur(10px)';
      htmlBackground.src = imgSource;
      htmlBackground.addEventListener(
        'load',
        () => (htmlBackground.style.filter = '')
      );
    })
  );
};

/////// SLIDER FUNCTION ///////
let curSlide = 0;
const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${130 * (i - slide)}%)`)
  );
};

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
  loadSlides();
};
init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

//UPLOAD IMAGE LOCALLY
const uploadSuccessful = () => {};
const userImg = document.querySelector('#imgupload');
let uploadedImg;
let alerted = false;
uploadIcon.addEventListener('click', () => userImg.click());

document.querySelector('#imgupload').addEventListener('change', () => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    localStorage.setItem('user--img', reader.result);
    htmlBackground.src = reader.result;

    if (!alerted) {
      document.querySelector('.modal--overlay').classList.remove('hidden');
      document.querySelector('.modal--box').classList.add('modal--active');
      alerted = true;
    }
  });
  reader.readAsDataURL(userImg.files[0]);
});

const closeModal = document
  .querySelector('.feather-x-square')
  .addEventListener('click', () => {
    document.querySelector('.modal--box').classList.remove('modal--active');
    document.querySelector('.modal--overlay').classList.add('hidden');
  });

// LOAD THE USER UPLOADED IMAGE UPON DOM LOAD
document.addEventListener('DOMContentLoaded', () => {
  const userUpload = localStorage.getItem('user--img');
  if (userUpload) htmlBackground.src = userUpload;
});

// TOGGLE SETTINGS

const ballBall = () => {
  if (!toggleBackground.classList.contains('toggle--active')) {
    toggleBall.style.transform = `translateX(19.8px)`;
    toggleActive = true;
  } else {
    toggleBall.style.transform = `translateX(0%)`;
    toggleActive = false;
  }
};
toggleContainer.addEventListener('click', () => {
  ballBall();
  toggleBackground.classList.toggle('toggle--active');
  console.log('working');
});
const clockBall = document.querySelector('.clock--ball');
const clockContainer = document.querySelector('.toggle--clock');
const clockBackground = document.querySelector('.clock--container');
const clockClock = () => {
  if (!clock) {
    clockBall.style.transform = `translateX(19.8px)`;
    clock = true;
    toggleActive = true;
  } else {
    clockBall.style.transform = `translateX(0%)`;
    clock = false;
    toggleActive = false;
  }
};

clockContainer.addEventListener('click', () => {
  clockClock();
  getDate();

  clockBackground.classList.toggle('toggle--active');
  if (clockBackground.classList.contains('toggle--active')) {
    clearInterval(clockUpdate);
  } else {
    clockUpdate = setInterval(() => {
      getDate();
    }, 1000);
  }
});
