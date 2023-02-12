const taskInputText = document.querySelector('.task--input');
const taskBtn = document.querySelector('.task--btn');
const taskList = document.querySelector('.task--list');
const taskItems = document.querySelectorAll('.task--item');

const todoItem = document.querySelector('.todo--item');
const todoBtn = document.querySelectorAll('.todo--btn');
const todoList = [
  'I ddddddddddddddddddddddddddddddddddddd',
  'I eeeeeeeeeeeeeeeeeeee ',
  'test test test',
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
        todoItemEl.remove();
        items--;
        taskCount();
      })
    );
  };

  //ADD TASK WITH BUTTON OR ENTER KEYS
  const addTask = function () {
    if (taskInputText.value === '') return;
    const inputText = taskInputText.value;
    todoList.push(inputText);
    taskList.insertAdjacentHTML(
      'afterbegin',
      `<div class='task--item'><p class="todo--item">${inputText}</p><button class="todo--btn"><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></div>`
    );
    taskCount();
    delTodo();
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
};
tasksMain();

// DATE
const getDate = () => {
  const newDate = new Date();

  const month = newDate.getMonth() + 1;
  const d = newDate.getDate();

  return (document.querySelector('.date').textContent = `${month
    .toString()
    .padStart(2, '0')} / ${d.toString().padStart(2, '0')} `);
};

getDate();
setInterval(() => {
  getDate();
}, 1000);
console.log(Date.parse(Date()));

//SETTINGS POPUP
const settingsIcon = document.querySelector('.settings--icon');
const settingsPopup = document.querySelector('.settings--popup');
const mainOverlay = document.querySelector('main');
const html = document.querySelector('html');
const settingsOpen = settingsIcon.addEventListener('click', function () {
  settingsPopup.classList.remove('hidden');
  html.style.transform = 'translateX(-30%)';
  mainOverlay.classList.add('overlay');
});

// const settingsClose = document.addEventListener('click', function (e) {
//   if (e.target != settingsPopup) {
//     html.style.transform = 'translateX(0%)';
//     settingsPopup.classList.remove('hidden');
//     mainOverlay.classList.remove('overlay');
//   }
// });
