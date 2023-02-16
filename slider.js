const userUpload = localStorage.getItem('user--img');
const placeholder = document.querySelector('.slider--placeholder');
if (userUpload) {
  placeholder.src = userUpload;
  placeholder.classList.add('slider--img');
  placeholder.classList.add('slider--1');
  placeholder.classList.remove('slider--placeholder');
  placeholder.dataset.img = userUpload;
}
