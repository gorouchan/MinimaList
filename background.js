chrome.storage.local.get(['lastBackground'], result => {
  if (result.lastBackground === null) {
    document.querySelector('.html--bg').src = 'black-bg.jpeg';
    console.log('is it null');
  } else {
    document.querySelector('.html--bg').src = result.lastBackground;
  }
});
