import SlideComponent from '../Slide.component';

import slide from './jsmpegDemo.pug';
import _style from './jsmpegDemo.scss';

import {
  nodeListToArray,
} from '../../share/awesome.func.js';

// service
import JSMpeg from 'jsmpeg-player';
import touchActive from '../../share/touchActiveMockClick.func';

// media
let
  videoTs0 = 'https://cycjimmy.github.io/jsmpeg-player/media/big_buck_bunny_640x360.ts'
  , videoTs1 = 'https://cycjimmy.github.io/jsmpeg-player/media/Sony_test_video_640x360.ts'
  , videoPoster0 = 'https://raw.githubusercontent.com/cycjimmy/staticFiles/storage/images/screenshot/big_buck_bunny_640x360.jpg'
  , videoPoster1 = 'https://raw.githubusercontent.com/cycjimmy/staticFiles/storage/images/screenshot/Sony_test_video_640x360.jpg'
;

export default class extends SlideComponent {
  constructor({
                context,
                mainSwiper,
                slideIndex,
                audioComponent,
              }) {
    super({
      context,
      mainSwiper,
      slideIndex,
      audioComponent,
    });

    this.oVideoWrapper = null;
    this.needContinuePlay = false;
    this.context.classList.add(_style.wrapper);
  };

  load() {
    return this.init({
      pugTemplate: slide,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
      doLeaveSlide: () => {
        // this.videoEl.player.stop();
        oVideoInstances.forEach((videoEl) => {
          if (videoEl) {
            videoEl.player.stop();
          }
        });
      },
    })
      .then(() => {
        // 初始化第一个视频
        oVideoInstances[0] = this.initVideoIns(oVideoUrls[0], oVideoPosters[0]);
      });
  };

  paramInit() {
    this.oVideoWrapper = this.context.querySelector('.' + _style.videoWrapper);
    this.aVideoChooseBtns = nodeListToArray(this.context.querySelectorAll('.' + _style.videoChoose));
  };

  eventBind() {
    this.aVideoChooseBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // 否有本身实例正在激活
        if (oVideoInstances[index]) {
          console.log('The video has been activated!');
          return;
        }

        // 销毁原有实例
        destroyOtherVideoIns()
          .then(() => {
            // 创建新实例
            oVideoInstances[index] = this.initVideoIns(oVideoUrls[index], oVideoPosters[index]);

            // 立即播放
            // oVideoInstances[index].player.play();
          });
      });
    });

    touchActive(this.aVideoChooseBtns);
  };


  initVideoIns(videoUrl, videoPoster) {
    return new JSMpeg.VideoElement(this.oVideoWrapper, videoUrl, {
      poster: videoPoster,
      decodeFirstFrame: false,
      // aspectPercent: '56.25%',
      loop: false,
      // autoplay: true,
      progressive: true,
      chunkSize: 383 * 1023,
      hookInPlay: () => {
        console.log('hookInPlay');

        if (this.audioComponent.isPlaying()) {
          this.needContinuePlay = true;
          this.audioComponent.pause();
        } else {
          this.needContinuePlay = false;
        }
      },
      hookInPause: () => {
        console.log('hookInPause');
        if (this.needContinuePlay) {
          this.audioComponent.play();
        }
      },
    });
  };
};

// private
let
  oVideoInstances = []
  , oVideoUrls = [videoTs0, videoTs1]
  , oVideoPosters = [videoPoster0, videoPoster1]

  , destroyOtherVideoIns = () => new Promise(resolve => {
    oVideoInstances.forEach((el, index) => {
      if (el) {
        el.destroy();
        oVideoInstances[index] = null;
      }
    });
    setTimeout(() => {
      resolve();
    }, 0);
  })
;
