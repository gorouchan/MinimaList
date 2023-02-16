if (localStorage.getItem('clock--toggle') === 'true') {
  document.querySelector('.clock--ball').style.transform = `translateX(19.8px)`;
  document.querySelector('.clock--container').classList.add('clock--active');
}
if (localStorage.getItem('disable-background--toggle') === 'true') {
  document.querySelector(
    '.toggle--ball'
  ).style.transform = `translateX(19.8px)`;
  document
    .querySelector('.disable-background--container')
    .classList.add('disable-background--active');
}
