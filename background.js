chrome.storage.local.get(['lastBackground'], result => {
  if (result.lastBackground === null || result.lastBackground === undefined) {
    document.querySelector('.html--bg').src = 'black-bg.jpeg';
  } else {
    document.querySelector('.html--bg').src = result.lastBackground;
  }
});
