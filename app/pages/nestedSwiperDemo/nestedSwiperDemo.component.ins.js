import {Page, singleton} from '@cycjimmy/h5-pages';
import Swiper from 'swiper';

import template from './nestedSwiperDemo.pug';
import _style from './nestedSwiperDemo.scss';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'nestedSwiperDemo',
      renderHtml: template({_style}),
      pageLeave() {
        this.nestedSwiper.slideTo(0, 0);
      },
    });
  };

  paramInit() {
    super.paramInit();

    this.slideContainer = this.page.querySelector(`.${_style.container}`);
  };

  extraRender() {
    this.nestedSwiperInit();
  };

  nestedSwiperInit() {
    this.nestedSwiper = new Swiper(this.slideContainer, {
      nested: true,
      roundLengths: true,

      pagination: {
        el: `.${_style.pagination}`,
        clickable: true,
        bulletActiveClass: _style.bulletActive,
      },

      spaceBetween: 30,
    });
  };
});

