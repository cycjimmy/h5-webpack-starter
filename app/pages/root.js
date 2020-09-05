import Swiper from 'swiper';
import {h5Pages, init} from '@cycjimmy/h5-pages';
import SwiperAnimation from '@cycjimmy/swiper-animation';
import h5Preloader from '@cycjimmy/h5-preloader';
import bgm from '../shared/bgm.ins';

// pages
import cover from './cover/cover.component.ins';
import features from './features/features.component.ins';
import basedOn from './basedOn/basedOn.component.ins';
import otherRecommended from './otherRecommended/otherRecommended.component.ins';
import nestedSwiperDemo from './nestedSwiperDemo/nestedSwiperDemo.component.ins';
import pageX from './pageX/pageX.component.ins';
import backCover from './backCover/backCover.component.ins';

import _style from './root.scss';

export default new class {
  constructor() {
    this.swiperAnimation = new SwiperAnimation();

    h5Pages.root.classList.add(_style.root);
  };

  init() {
    return init({
      Swiper,
      pages: [
        cover,
        features,
        basedOn,
        otherRecommended,
        nestedSwiperDemo,
        pageX,
        backCover,
      ],
      containerExtraHtml: `<div class="swiper-pagination ${_style.pagination}"></div>`,
      swiperOptions: {
        direction: 'vertical',
        mousewheel: true,
        speed: 500,

        pagination: {
          el: `.${_style.pagination}`,
          clickable: true,
          bulletActiveClass: _style.bulletActive,
        },

        hashNavigation: {
          watchState: true,
          replaceState: true,
        },

        on: {
          init: () => Promise.resolve()
            .then(() => bgm.load())
            .then(() => h5Preloader().progressComplete())
            .then(() => this.swiperAnimation.init(h5Pages.swiper).animate()),

          slideChange: () => setTimeout(() => this.swiperAnimation.init(h5Pages.swiper).animate(), 0),
        },
      },
    })
  };
};

