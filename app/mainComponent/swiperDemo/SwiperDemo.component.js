import SlideComponent from '../Slide.component';

import * as slide from './swiperDemo.pug';
import * as _style from './swiperDemo.scss';

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

      pagination: '.' + _style.pagination,
      paginationClickable: true,
      bulletActiveClass: _style.bulletActive,

      spaceBetween: 30,
    });
  };
};

