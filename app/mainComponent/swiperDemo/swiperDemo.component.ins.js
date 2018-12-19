import SlideComponent from '../Slide.component';
import instanceComponent from '../instanceComponent';

import slide from './swiperDemo.pug';
import _style from './swiperDemo.scss';

// service
import Swiper from 'swiper';

const _instance = instanceComponent(class extends SlideComponent {
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

  load() {
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
      nested: true,
      roundLengths: true,

      pagination: {
        el: '.' + _style.pagination,
        clickable: true,
        bulletActiveClass: _style.bulletActive,
      },

      spaceBetween: 30,
    });
  };
});

export default (param) => _instance(param);

