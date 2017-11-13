import Swiper from 'swiper';

import SlideComponent from '../Slide.component';
import slide from './swiperDemo.pug';
import _style from './swiperDemo.scss';

export default class extends SlideComponent {
  constructor({
                context,
                slideIndex,
                audioComponent,
              }) {
    super({
      context,
      slideIndex,
      audioComponent,
    });
  };

  load(mainSwiper) {
    return this.init({
      pugTemplate: slide,
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

      pagination: {
        el: '.' + _style.pagination,
        clickable: true,
        bulletActiveClass: _style.bulletActive,
      },

      spaceBetween: 30,
    });
  };
};

