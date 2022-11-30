
const HEADER__BAR__MENU = 'header__bar__menu';
const DISPLAY_NONE = ' displayNone';

document
  .querySelector('#menu')
  .addEventListener('click', (e) => {
    if (e.getAttribute('class') === HEADER__BAR__MENU) {
      e.setAttribute('class', HEADER__BAR__MENU + DISPLAY_NONE);
    } else {
      e.setAttribute('class', HEADER__BAR__MENU);
    }
  })

var swiper = new Swiper(".mySwiper", {
  Navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper2 = new Swiper(".mySwiper2", {
  pagination: {
    el: ".swiper-pagination",
  },
});
