import Component from '../share/Component';
import Swiper from 'swiper';

import main from './main.pug';
import slides from './sildes.pug';
import mainStyle from './main.scss';

// audio
// import audioSrc from '../../static/media/Richard Clayderman - LOVE IS BLUE.mp3';

let audioSrc = 'https://raw.githubusercontent.com/cycjimmy/staticFiles/storage/media/Richard_Clayderman-LOVE_IS_BLUE.mp3';

// component
import CoverComponent from './cover/Cover.component';
import SwiperDemoComponent from './swiperDemo/SwiperDemo.component';
import ImageCompressUploadDemoComponent from './imageCompressUploadDemo/ImageCompressUploadDemo.component';
import JsmpegDemoComponent from './jsmpegDemo/JsmpegDemo.component';
import H5videoPlayerDemoComponent from './h5videoPlayerDemo/H5videoPlayerDemo.component';
import WebglDemoComponent from './webglDemo/WebglDemo.component';
import SlideXComponent from './slideXComponent/SlideX.component';
import AudioComponent from '../share/audioComponent/Audio.component';

// service
import loadingOverlayServiceIns from '../share/loading/loadingOverlay.service.ins';
import SwiperAnimateServiceIns from '../share/Swiper/SwiperAnimate.service.ins';

export default class extends Component {
  constructor() {
    super({
      context: document.querySelector('.main-screen'),
    });
    this.mainSwiper = null;
    this.audioComponent = new AudioComponent({
      context: this.context,
      audioSrc: audioSrc,
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
                    return this.audioComponent.load();
                  })
                  .then(() => {
                    return new loadingOverlayServiceIns().doRemove();
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