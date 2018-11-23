import Component from '../share/Component';
import Swiper from 'swiper';

import main from './main.pug';
import slides from './sildes.pug';
import mainStyle from './main.scss';

// audio
// import audioSrc from '../../static/media/';

let audioSrc = 'https://cycjimmy.github.io/staticFiles/media/Richard_Clayderman-LOVE_IS_BLUE.mp3';

// component
import CoverComponent from './cover/Cover.component';
import SwiperDemoComponent from './swiperDemo/SwiperDemo.component';
import ImageCompressUploadDemoComponent from './imageCompressUploadDemo/ImageCompressUploadDemo.component';
import JsmpegDemoComponent from './jsmpegDemo/JsmpegDemo.component';
import H5videoPlayerDemoComponent from './h5videoPlayerDemo/H5videoPlayerDemo.component';
import WebglDemoComponent from './webglDemo/WebglDemo.component';
import SlideXComponent from './slideXComponent/SlideX.component';

import H5AudioControls from 'h5-audio-controls';

// service
import loadingOverlayServiceIns from '../loadingComponent/loadingOverlay.service.ins';
import SwiperAnimation from 'swiper-animation';

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
            length: SlideComponents.length,
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
                .then(() => new loadingOverlayServiceIns().doRemove())
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
      SlideComponents.forEach((Component, index) => {
        new Component({
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
  , SlideComponents = [
    CoverComponent,
    SwiperDemoComponent,
    ImageCompressUploadDemoComponent,
    JsmpegDemoComponent,
    H5videoPlayerDemoComponent,
    WebglDemoComponent,
    SlideXComponent,
  ]
;