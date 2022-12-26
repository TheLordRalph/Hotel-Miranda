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

window.onload = () => {
  if (document.body.scrollWidth > 1000) {
    document.getElementById('menuEnlaces').classList.remove(DISPLAY_NONE);
  }
}

window.addEventListener('resize', () => {
  if (document.body.scrollWidth > 1000) {
    document.getElementById('menuEnlaces').classList.remove(DISPLAY_NONE);
  } else {
    document.getElementById('menuEnlaces').classList.add(DISPLAY_NONE);
  }
})



// Swipers

var swiper = new Swiper(".swiper-homeRooms-movile", {
  Navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swiper-homeRooms-desktop", {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 30,
  Navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swiper-menu", {
  Navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiperFacilities = new Swiper(".swiper-facilities", {
  pagination: {
    el: ".swiper-pagination",
  },
});

var swiper3 = new Swiper(".swiper--square", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});


// Swiper Rooms.html

var swiperRooms = new Swiper(".swiperRooms", {
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});


// Swiper Abous.html

var swiper = new Swiper(".swiper-about", {
  Navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
