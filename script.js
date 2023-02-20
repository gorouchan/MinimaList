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
const htmlBackground = document.querySelector('.html--bg');

let strikedList;

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
  document.querySelectorAll('.todo--btn').forEach(btn =>
    btn.addEventListener('click', function (e) {
      e.target.closest('.task--item').classList.remove('show');

      setTimeout(() => {
        e.target.closest('.task--item').remove();
        let newTodo = [];
        document.querySelectorAll('.todo--item').forEach(todo => {
          newTodo.push(todo.textContent);
        });
        todoList = newTodo.reverse();
        todoStorage();
        items--;
        taskCount();
        titleUpdate();
        strikedList = [];
        document.querySelectorAll('.todo--item').forEach(todo => {
          if (todo.classList.contains('strike')) {
            strikedList.push('true');
          } else {
            strikedList.push('false');
          }
          console.log(strikedList);
        });
        localStorage.setItem('strike--list', strikedList);
      }, 500);
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
      `<div class='task--item' id="task--box" >
      <div class="check--box" id="check-box">
      <svg xmlns="http://www.w3.org/2000/svg" "width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="${
        localStorage.getItem('light-mode') === 'true' ? 'white' : 'black'
      }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
      
      <svg xmlns="http://www.w3.org/2000/svg" "width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${
        localStorage.getItem('light-mode') === 'true' ? 'white' : 'black'
      }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="check-btn"class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <p contenteditable class="todo--item" style="outline-style:none;">${inputText}</p><button class="todo--btn"><svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" viewBox="0 0 24 24" fill="none" stroke="${
        localStorage.getItem('light-mode') === 'true' ? 'white' : 'black'
      }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></div>`
    );
    document
      .querySelectorAll('.todo--item')
      .forEach(
        item =>
          (item.style.color =
            localStorage.getItem('light-mode') === 'true' ? 'white' : 'black')
      );
    document
      .querySelectorAll('.task--item')
      .forEach(
        task =>
          (task.style.backgroundColor =
            localStorage.getItem('light-mode') === 'true' ? '#212121' : 'white')
      );
    preventEnter();

    taskCount();
    titleUpdate();
    delTodo();

    editTasks();
    checkBox();
    todoStorage();
    //check
    strikedList = [];
    document.querySelectorAll('.todo--item').forEach(todo => {
      if (todo.classList.contains('strike')) {
        strikedList.push('true');
      } else {
        strikedList.push('false');
      }
      console.log(strikedList);
    });
    localStorage.setItem('strike--list', strikedList);
    //ADD FOCUS TO TEXTAREA AFTER ADDING A TASK
    taskInputText.focus();
    // COPYING FROM lightOrDark() so it's not too CPU extensive
  }, 15);
  setTimeout(() => {
    fadeOut();
  }, 15);
  taskCount();
  titleUpdate();
  taskInputText.value = '';
};
const inputBtn = taskBtn.addEventListener('click', addTask);
const enterTask = taskInputText.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addTask();
});

// SHOW THE TODO LIST IN EXISTING ARRAY
const showTodo = function () {
  todoList.forEach(todo => {
    taskList.insertAdjacentHTML(
      'afterbegin',
      `<div class='task--item' id="task--box" >
      <div class="check--box" id="check-box">
      <svg xmlns="http://www.w3.org/2000/svg" "width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="${
        localStorage.getItem('light-mode') === 'true' ? 'white' : 'black'
      }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
      
      <svg xmlns="http://www.w3.org/2000/svg" "width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${
        localStorage.getItem('light-mode') === 'true' ? 'white' : 'black'
      }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="check-btn"class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <p contenteditable class="todo--item" style="outline-style:none;">${todo}</p><button class="todo--btn"><svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" viewBox="0 0 24 24" fill="none" stroke="${
        localStorage.getItem('light-mode') === 'true' ? 'white' : 'black'
      }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></div>`
    );
  });
  taskCount();
  delTodo();
  titleUpdate();
};
showTodo();
taskCount();

/// LISTEN FOR CHANGES IN THE TASK ITEMS

const editTasks = () => {
  document.querySelectorAll('.todo--item').forEach(item =>
    item.addEventListener('keyup', function (e) {
      let newTodo = [];
      document.querySelectorAll('.todo--item').forEach(todo => {
        newTodo.push(todo.textContent);
      });
      todoList = newTodo.reverse();
      todoStorage();
    })
  );
};
editTasks();

const preventEnter = () => {
  document.querySelectorAll('.todo--item').forEach(todo =>
    todo.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        todo.blur();
      }
    })
  );
};
preventEnter();

// CHECK BUTTON
const checkBox = () => {
  document.querySelectorAll('.check--box').forEach(check =>
    check.addEventListener('click', function (e) {
      console.log('wokring');
      e.target
        .closest('#task--box')
        .children.item(1)
        .classList.toggle('strike');
      e.target
        .closest('#check-box')
        .children.item(1)
        .classList.toggle('checked');

      strikedList = [];
      document.querySelectorAll('.todo--item').forEach(todo => {
        if (todo.classList.contains('strike')) {
          strikedList.push('true');
        } else {
          strikedList.push('false');
        }
        console.log(strikedList);
      });
      localStorage.setItem('strike--list', strikedList);
    })
  );
};
checkBox();
const checkStrike = () => {
  document.querySelectorAll('.todo--item').forEach((todo, i) => {
    const lol = localStorage.getItem('strike--list').split(',');
    if (lol[i] === 'true') {
      todo.classList.add('strike');
    }
    console.log(lol[i]);
  });
  document.querySelectorAll('.feather-check').forEach((check, i) => {
    const lol = localStorage.getItem('strike--list').split(',');
    if (lol[i] === 'true') {
      check.classList.add('checked');
    }
    console.log(lol[i]);
  });
};
checkStrike();
let timer;
taskInputText.addEventListener('input', function () {
  const taskBar = document.querySelector('.task');
  taskBar.classList.add('hover');
  clearTimeout(timer);
  timer = setTimeout(() => {
    taskBar.classList.remove('hover');
  }, 2500);
});

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
  return localStorage.getItem('clock--toggle') === 'true'
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
    localStorage.getItem('light-mode') === 'true' ? 'white' : 'black'
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

const lightOrDark = () => {
  localStorage.getItem('light-mode') === 'true'
    ? lightIcon.classList.add('theme--active--light')
    : darkIcon.classList.add('theme--active--dark');
  settingsMenu.style.backgroundColor =
    localStorage.getItem('light-mode') === 'true' ? '#F7F6F2' : 'rgb(21,21,21)';
  themeContainer.style.backgroundColor =
    localStorage.getItem('light-mode') === 'true'
      ? '#ECE8DD'
      : 'rgb(41, 41, 41)';
  taskBox.style.backgroundColor =
    localStorage.getItem('light-mode') === 'true' ? '#212121' : 'white';
  taskInputText.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'white' : 'black';

  settingsHeader.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  settingsFooter.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  pexelsDisclaimer.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  themeHeader.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  galleryHeader.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  dateHeader.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  taskHeader.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  themeDescription.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  toggleDescription.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  suggestions.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';
  clockText.style.color =
    localStorage.getItem('light-mode') === 'true' ? 'black' : 'white';

  changeCSS();

  document
    .querySelectorAll('a')
    .forEach(
      link =>
        (link.style.color =
          localStorage.getItem('light-mode') === 'true'
            ? 'rgb(168, 100, 54)'
            : 'wheat')
    );

  document.querySelector('.feather-corner-down-left').style.stroke =
    localStorage.getItem('light-mode') === 'true' ? 'white' : 'black';
  document
    .querySelectorAll('.feather-trash-2')
    .forEach(
      btn =>
        (btn.style.stroke =
          localStorage.getItem('light-mode') === 'true' ? 'white' : 'black')
    );
  document
    .querySelectorAll('.feather-check')
    .forEach(
      btn =>
        (btn.style.stroke =
          localStorage.getItem('light-mode') === 'true' ? 'white' : 'black')
    );
  document
    .querySelectorAll('.feather-square')
    .forEach(
      btn =>
        (btn.style.stroke =
          localStorage.getItem('light-mode') === 'true' ? 'white' : 'black')
    );
  document
    .querySelectorAll('.svg--alter')
    .forEach(
      btn =>
        (btn.style.stroke =
          localStorage.getItem('light-mode') === 'true' ? 'black' : 'white')
    );
  document
    .querySelectorAll('.todo--item')
    .forEach(
      item =>
        (item.style.color =
          localStorage.getItem('light-mode') === 'true' ? 'white' : 'black')
    );
  document
    .querySelectorAll('.task--item')
    .forEach(
      task =>
        (task.style.backgroundColor =
          localStorage.getItem('light-mode') === 'true' ? '#212121' : 'white')
    );

  //// BACKGROUND
  if (localStorage.getItem('disable-background--toggle') === 'true') return;

  htmlBackground.style.filter = 'blur(10px)';
  htmlBackground.src =
    localStorage.getItem('light-mode') === 'true'
      ? 'white-bg.jpeg'
      : 'black-bg.jpeg';

  htmlBackground.addEventListener('load', () => {
    htmlBackground.style.filter = '';
    chrome.storage.local.set({ lastBackground: htmlBackground.src }, () => {
      console.log('set new last background');
    });
  });
};

lightOrDark();
lightMode.addEventListener('click', () => {
  // light = true;
  // dark = false;
  localStorage.setItem('light-mode', true);
  localStorage.setItem('dark-mode', false);
  lightOrDark();
});
nightMode.addEventListener('click', () => {
  // dark = true;
  // light = false;
  localStorage.setItem('light-mode', false);
  localStorage.setItem('dark-mode', true);
  lightOrDark();
});

//UPLOAD IMAGE LOCALLY
const uploadSuccessful = () => {};
const userImg = document.querySelector('#imgupload');
let uploadedImg;

uploadIcon.addEventListener('click', () => userImg.click());
document.querySelector('#imgupload').addEventListener('change', () => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    chrome.storage.local.set({ userUploadedImg: reader.result }, () => {
      console.log('Value is set to ' + reader.result);
    });
    chrome.storage.local.get(['userUploadedImg'], function (result) {
      console.log('working', result.userUploadedImg);
      htmlBackground.src = result.userUploadedImg;

      // set the uploaded image to lastBackground
      chrome.storage.local.set(
        { lastBackground: result.userUploadedImg },
        () => {
          console.log('set new last background');
        }
      );
    });

    //RETURN ALERTED TRUE AFTER SHOWING WARNING MODAL ONCE
    if (localStorage.getItem('alerted') !== 'true') {
      document.querySelector('.modal--overlay').classList.remove('hidden');
      document.querySelector('.modal--box').classList.add('modal--active');
      localStorage.setItem('alerted', true);
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

// TOGGLE SETTINGS

const ballBall = () => {
  if (
    localStorage.getItem('disable-background--toggle') === null ||
    localStorage.getItem('disable-background--toggle') === 'false'
  ) {
    toggleBall.style.transform = `translateX(19.8px)`;
    localStorage.setItem('disable-background--toggle', true);
  } else {
    toggleBall.style.transform = `translateX(0%)`;
    localStorage.setItem('disable-background--toggle', false);
  }
};
toggleContainer.addEventListener('click', () => {
  ballBall();
  toggleBackground.classList.toggle('disable-background--active');
});
const clockBall = document.querySelector('.clock--ball');
const clockContainer = document.querySelector('.toggle--clock');
const clockBackground = document.querySelector('.clock--container');

const clockClock = () => {
  if (
    localStorage.getItem('clock--toggle') === null ||
    localStorage.getItem('clock--toggle') === 'false'
  ) {
    clockBall.style.transform = `translateX(19.8px)`;
    localStorage.setItem('clock--toggle', true);
  } else {
    clockBall.style.transform = `translateX(0%)`;
    localStorage.setItem('clock--toggle', false);
  }
};

clockContainer.addEventListener('click', () => {
  clockClock();
  getDate();

  clockBackground.classList.toggle('clock--active');
  if (clockBackground.classList.contains('clock--active')) {
    clearInterval(clockUpdate);
  } else {
    clockUpdate = setInterval(() => {
      getDate();
    }, 1000);
  }
});
