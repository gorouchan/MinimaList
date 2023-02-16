// const userUpload = localStorage.getItem('user--img');
// const placeholder = document.querySelector('.slider--placeholder');
// if (userUpload) {
//   placeholder.src = userUpload;
//   placeholder.classList.add('slider--img');
//   placeholder.classList.add('slider--1');
//   placeholder.classList.remove('slider--placeholder');
//   placeholder.dataset.img = userUpload;
// }

chrome.storage.local.get(['userUploadedImg'], result => {
  console.log('why isnt it working', result.userUploadedImg);
  if (result.userUploadedImg) {
    document.querySelector('.slider--placeholder').src = result.userUploadedImg;
    document.querySelector('.slider--placeholder').dataset.img =
      result.userUploadedImg;
    document
      .querySelector('.slider--1')
      .classList.remove('slider--placeholder');
    console.log(document.querySelector('.slider--1'));
  }
});
