import Component from '../share/Component';
import Swiper from 'swiper';

import main from './main.pug';
import slides from './sildes.pug';
import mainStyle from './main.scss';
// component
import coverComponent from './cover/cover.component.ins';
import swiperDemoComponent from './swiperDemo/swiperDemo.component.ins';
import imageCompressUploadDemoComponent from './imageCompressUploadDemo/imageCompressUploadDemo.component.ins';
import jsmpegDemoComponent from './jsmpegDemo/jsmpegDemo.component.ins';
import h5videoPlayerDemoComponent from './h5videoPlayerDemo/h5videoPlayerDemo.component.ins';
import webglDemoComponent from './webglDemo/webglDemo.component.ins';
import slideXComponent from './slideX/slideX.component.ins';

import H5AudioControls from 'h5-audio-controls';
// service
import SwiperAnimation from 'swiper-animation';
import h5Preloader from 'h5-preloader';

// audio
// import audioSrc from '../../static/media/';

let audioSrc = 'https://cycjimmy.github.io/staticFiles/media/Richard_Clayderman-LOVE_IS_BLUE.mp3';

export default class extends Component {
  constructor() {
    super({
      context: document.querySelector('.main-screen'),
    });
    this.mainSwiper = null;
    this.audioComponent = new H5AudioControls(audioSrc, {
      context: this.context,
    });
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
        return this.render({
          pugTemplate: slides,
          wrapperElement: this.context.querySelector('.' + _style.wrapper),
          insetParam: {
            _style,
            length: slideComponents.length,
          },
        });
      })
      .then(() => {
        return new Promise(resolve => {
          // Swiper
          this.mainSwiper = new Swiper(this.context, {
            pagination: {
              el: '.' + _style.pagination,
              clickable: true,
              bulletActiveClass: _style.bulletActive,
            },

            direction: 'vertical',
            wrapperClass: _style.wrapper,
            mousewheel: true,

            hashNavigation: {
              watchState: true,
              replaceState: true,
            },

            on: {
              init: () => Promise.resolve()
                .then(() => setTimeout(() => this.renderSlideComponents(), 0))
                .then(() => this.audioComponent.load())
                .then(() => h5Preloader().progressComplete())
                .then(() => swiperAnimation.init(this.mainSwiper).animate()),

              slideChange: () => setTimeout(() => swiperAnimation.init(this.mainSwiper).animate(), 0),
            },
          });

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };

  renderSlideComponents() {
    return Promise.all([
      // SlideComponentsLoader
      slideComponents.forEach((component, index) => {
        component({
          context: this.context.querySelector('.' + _style.slide + ':nth-of-type(' + (index + 1) + ')'),
          mainSwiper: this.mainSwiper,
          slideIndex: index,
          audioComponent: this.audioComponent,
        }).load();
      }),
    ]);
  };
};

// private
let
  _style = mainStyle
  , swiperAnimation = new SwiperAnimation()
  , slideComponents = [
    coverComponent,
    swiperDemoComponent,
    imageCompressUploadDemoComponent,
    jsmpegDemoComponent,
    h5videoPlayerDemoComponent,
    webglDemoComponent,
    slideXComponent,
  ]
;
