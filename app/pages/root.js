import Swiper from 'swiper';
import h5Pages, {init} from '@cycjimmy/h5-pages';
import SwiperAnimation from '@cycjimmy/swiper-animation';
import h5Preloader from '@cycjimmy/h5-preloader';
import bgm from '../bgm.ins';

// pages
import cover from './cover/cover.component.ins';
import swiperDemo from './swiperDemo/swiperDemo.component.ins';
import imageCompressUploadDemo from './imageCompressUploadDemo/imageCompressUploadDemo.component.ins';
import jsmpegDemo from './jsmpegDemo/jsmpegDemo.component.ins';
import h5videoPlayerDemo from './h5videoPlayerDemo/h5videoPlayerDemo.component.ins';
import webglDemo from './webglDemo/webglDemo.component.ins';
import pageX from './pageX/pageX.component.ins';
import backCover from './backCover/backCover.component.ins';

import _style from './root.scss';

export default class {
  constructor() {
    this.swiperAnimation = new SwiperAnimation();
    this.bgm = bgm();
  };

  init() {
    return init({
      Swiper,
      pages: [
        cover,
        swiperDemo,
        imageCompressUploadDemo,
        jsmpegDemo,
        h5videoPlayerDemo,
        webglDemo,
        pageX,
        backCover,
      ],
      containerExtraHtml: `<div class="swiper-pagination ${_style.pagination}"></div>`,
      swiperOptions: {
        pagination: {
          el: `.${_style.pagination}`,
          clickable: true,
          bulletActiveClass: _style.bulletActive,
        },

        direction: 'vertical',
        mousewheel: true,

        hashNavigation: {
          watchState: true,
          replaceState: true,
        },

        on: {
          init: () => Promise.resolve()
            .then(() => this.bgm.load())
            .then(() => h5Preloader().progressComplete())
            .then(() => this.swiperAnimation.init(h5Pages.swiper).animate()),

          slideChange: () => setTimeout(() => this.swiperAnimation.init(h5Pages.swiper).animate(), 0),
        },
      },
    })
  };
};

