import Component from '../share/Component';
import Swiper from 'swiper';

import * as main from './main.pug';
import * as mainStyle from './main.scss';

// audio
import * as audioSrc from '../../static/media/Richard Clayderman - LOVE IS BLUE.mp3';

// component
import Slide0Component from './slide0Component/Slide0.component';
import Slide1Component from './slide1Component/Slide1.component';
import Slide2Component from './slide2Component/Slide2.component';
import Slide3Component from './slide3Component/Slide3.component';
import Slide4Component from './slide4Component/Slide4.component';
import SlideXComponent from './slideXComponent/SlideX.component';
import AudioComponent from '../share/audioComponent/Audio.component';

// service
import loadingOverlayServiceIns from '../share/loadingOverlay.service.ins';
import SwiperAnimateServiceIns from '../share/Swiper/SwiperAnimate.service.ins';
import MainSwiperIns from './MainSwiper.ins';

export default class MainSctComponent extends Component {
  constructor() {
    super({
      context: document.querySelector('.main-screen'),
    });
    this.mainSwiper = null;
  };

  load() {
    return this.render({
      pugTemplate: main,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
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
                this.renderSlideComponents()
                  .then(() => {
                    return new loadingOverlayServiceIns().load()
                  })
                  .then(() => {
                    new SwiperAnimateServiceIns().cache(swiper);
                    new SwiperAnimateServiceIns().animate(swiper);
                  });
              }, 0);
            },
            onSlideChangeEnd: (swiper) => {
              new SwiperAnimateServiceIns().animate(swiper);
            },
          });

          // setMainSwiper
          new MainSwiperIns().setMainSwiper(this.mainSwiper);

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };

  renderSlideComponents() {
    return Promise.all([
      // SlideComponentsLoader
      SlideComponents.forEach((Component, index) => {
        new Component({
          context: this.context.querySelector('.' + _style.slide + ':nth-of-type(' + (index + 1) + ')'),
          slideIndex: index,
        }).load();
      }),

      new AudioComponent({
        context: this.context,
        audioSrc: audioSrc,
      }).load(),
    ]);
  };
};

// private
let
  _style = mainStyle
  , SlideComponents = [
    Slide0Component,
    Slide1Component,
    Slide2Component,
    Slide3Component,
    Slide4Component,
    SlideXComponent,
  ]
;