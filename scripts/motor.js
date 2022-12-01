const DISPLAY_NONE = 'displayNone';

document
  .querySelector('#burger')
  .addEventListener('click', () => {
    let menuEnlaces = document.getElementById('menuEnlaces');
    menuEnlaces.classList.toggle(DISPLAY_NONE);
    document.getElementById('burgerBar').classList.toggle('animate');
  })

let lastScroll = 0;
window.addEventListener("scroll", () => {
  if (window.scrollY < 10) {
    document.getElementById('header').classList.remove('header__bar--fixd');
  } else if (window.scrollY < lastScroll) {
    document.getElementById('header').classList.add('header__bar--fixd');
  } else {
    document.getElementById('header').classList.remove('header__bar--fixd');
  }
  lastScroll = window.scrollY;
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

var swiper3 = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});
