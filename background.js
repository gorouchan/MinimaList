document.querySelector('.html--bg').src = chrome.storage.local.get(
  ['lastBackground'],
  result => {
    if (result.lastBackground === null) {
      document.querySelector('.html--bg').src = 'img/black-bg.jpeg';
    } else {
      document.querySelector('.html--bg').src = result.lastBackground;
    }
  }
);
