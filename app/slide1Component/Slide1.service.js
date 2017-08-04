import Swiper from 'swiper';

import * as slide1Style from './slide1.scss';

export default class Slide0Service {
  constructor({
                context,
                slideIndex,
              }) {
    this.context = context;
    this.slideIndex = slideIndex;
  };

  load(mainSwiper) {
    this.swiperCommand(mainSwiper);
    this.eventBind();

    let
      slideContainer = this.context.querySelector('.' + _style.container)
    ;

    new Swiper(slideContainer, {
      nested: true,                           // 嵌套
      roundLengths: true,                     // 取整

      pagination: '.' + _style.pagination,
      paginationClickable: true,
      bulletActiveClass: _style.bulletActive,

      spaceBetween: 30,
    });
  };

  swiperCommand(mainSwiper) {
    mainSwiper.on('slideChangeEnd', () => {
      if (mainSwiper.realIndex === this.slideIndex) {
        console.log('slide' + this.slideIndex);
      }
    });
  };

  eventBind() {
  };
};

// private
let
  _style = slide1Style
;
