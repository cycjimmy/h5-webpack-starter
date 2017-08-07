import SlideComponent from '../Slide.component';

import * as slide1 from './slide1.pug';
import * as slide1Style from './slide1.scss';

export default class Slide1Component extends SlideComponent {
  constructor({
                context,
                slideIndex,
              }) {
    super({
      context,
      slideIndex,
    });
  };

  load(mainSwiper) {
    return this.init({
      pugTemplate: slide1,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    })
      .then(() => {
        this.nestedSwiperInit();
      });
  };

  paramInit() {
    this.slideContainer = this.context.querySelector('.' + _style.container);
  };

  nestedSwiperInit() {
    this.nestedSwiper = new Swiper(this.slideContainer, {
      nested: true,                           // 嵌套
      roundLengths: true,                     // 取整

      pagination: '.' + _style.pagination,
      paginationClickable: true,
      bulletActiveClass: _style.bulletActive,

      spaceBetween: 30,
    });
  };
};

// private
let
  _style = slide1Style
;