'use strict';

/////// SLIDER FUNCTION ///////
const SLIDER = () => {
  /////////  CHANGE BACKGROUND /////////////
  const sliderContainer = document.querySelector('.slider--container');
  const slides = document.querySelectorAll('.slider--img');
  const btnRight = document.querySelector('.next--slide');
  const btnLeft = document.querySelector('.prev--slide');

  const loadSlides = () => {
    slides.forEach(img =>
      img.addEventListener('click', function (e) {
        const imgSource = e.target.dataset.img;
        htmlBackground.style.filter = 'blur(10px)';
        htmlBackground.src = imgSource;

        chrome.storage.local.set({ lastBackground: imgSource }, () => {
          console.log('set new last background');
        });
        htmlBackground.addEventListener(
          'load',
          () => (htmlBackground.style.filter = '')
        );
      })
    );
  };

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
    slides.forEach((s, i) => {
      if (!s.src) console.log('working');
      s.style.transform = `translateX(${130 * (i - slide)}%)`;
    });
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
};

let tempImg;
chrome.storage.local.get(['userUploadedImg'], result => {
  tempImg = result.userUploadedImg;

  if (tempImg) {
    document.querySelector('.slider--placeholder').src = tempImg;
    document.querySelector('.slider--placeholder').dataset.img = tempImg;
    document.querySelector('.slider--placeholder').classList.add('slider--1');
    document.querySelector('.slider--placeholder').classList.add('slider--img');
    document
      .querySelector('.slider--1')
      .classList.remove('slider--placeholder');
    SLIDER();
  } else {
    SLIDER();
  }
});
