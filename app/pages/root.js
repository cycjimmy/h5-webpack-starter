import Swiper from 'swiper';
import { h5Pages, init } from '@cycjimmy/h5-pages';
import SwiperAnimation from '@cycjimmy/swiper-animation';
import h5Preloader from '@cycjimmy/h5-preloader';
import bgm from '@/shared/bgm.ins';

// pages
import cover from '@/pages/cover/cover.component.ins';
import features from '@/pages/features/features.component.ins';
import basedOn from '@/pages/basedOn/basedOn.component.ins';
import otherRecommended from '@/pages/otherRecommended/otherRecommended.component.ins';
import nestedSwiperDemo from '@/pages/nestedSwiperDemo/nestedSwiperDemo.component.ins';
import popupDemo from '@/pages/popupDemo/popupDemo.component.ins';
import pageX from '@/pages/pageX/pageX.component.ins';
import backCover from '@/pages/backCover/backCover.component.ins';

import _style from '@/pages/root.scss';

export default new class {
  constructor() {
    this.swiperAnimation = new SwiperAnimation();

    h5Pages.root.classList.add(_style.root);
  }

  init() {
    return init({
      Swiper,
      pages: [
        cover,
        features,
        basedOn,
        otherRecommended,
        nestedSwiperDemo,
        popupDemo,
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

          slideChange: () => setTimeout(
            () => this.swiperAnimation.init(h5Pages.swiper).animate(),
            0,
          ),
        },
      },
    });
  }
}();
