// service
import Swiper from 'swiper';
import {Page, singleton} from '@cycjimmy/h5-pages';

import template from './swiperDemo.pug';
import _style from './swiperDemo.scss';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'swiperDemo',
      renderHtml: template({_style}),
    });
  }

  paramInit() {
    super.paramInit();
    this.slideContainer = this.page.querySelector('.' + _style.container);
  };

  extraRender() {
    this.nestedSwiperInit();
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

