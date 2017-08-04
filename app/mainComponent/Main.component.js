import Templates from '../share/Templates';
import Swiper from 'swiper';

import {
  swiperAnimateCache,
  swiperAnimate,
} from '../share/Swiper/swiper.animate';

import * as main from './main.pug';
import * as mainStyle from './main.scss';

// audio
import * as audioSrc from '../../static/media/Richard Clayderman - LOVE IS BLUE.mp3';

// component
import Slide0Component from '../slide0Component/Slide0.component';
import Slide1Component from '../slide1Component/Slide1.component';
import Slide2Component from '../slide2Component/Slide2.component';
import Slide3Component from '../slide3Component/Slide3.component';
import Slide4Component from '../slide4Component/Slide4.component';
import AudioComponent from '../share/audioComponent/Audio.component';

// service
import loadingOverlayServiceIns from '../share/loadingOverlay.service.ins';

export default class MainSctComponent {
  constructor() {
    this.context = document.querySelector('.main-screen');
    this.mainSwiper = null;
  }

  load() {
    // load flow
    return new Promise(resolve => {
      new Templates(main, this.context, {
        _style,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {
          // Swiper
          this.mainSwiper = new Swiper(this.context, {
            pagination: '.' + _style.pagination,
            paginationClickable: true,
            bulletActiveClass: _style.bulletActive,

            direction: 'vertical',
            mousewheelControl: true,
            wrapperClass: _style.wrapper,

            hashnav: true,
            hashnavWatchState: true,
            replaceState: true,

            onInit: (swiper) => {
              setTimeout(() => {
                new loadingOverlayServiceIns().load()
                  .then(() => {
                    swiperAnimateCache(swiper);
                    swiperAnimate(swiper);
                  });
              }, 50);
            },
            onSlideChangeEnd: (swiper) => {
              swiperAnimate(swiper);
            },
          });

          setTimeout(() => {
            resolve();
          }, 0);
        });
      })
      .then(() => {
        return Promise.all([
          new Slide0Component(this.context.querySelector('.' + _style.slide0)).load(this.mainSwiper),
          new Slide1Component(this.context.querySelector('.' + _style.slide1)).load(this.mainSwiper),
          new Slide2Component(this.context.querySelector('.' + _style.slide2)).load(this.mainSwiper),
          new Slide3Component(this.context.querySelector('.' + _style.slide3)).load(this.mainSwiper),
          new Slide4Component(this.context.querySelector('.' + _style.slide4)).load(this.mainSwiper),

          new AudioComponent({
            context: this.context,
            audioSrc: audioSrc,
          }).load(),
        ]);
      });
  };
};

// private
let
  _style = mainStyle
;