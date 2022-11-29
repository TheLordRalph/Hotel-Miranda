import Swiper from 'swiper';
import './swiper/css';

const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  