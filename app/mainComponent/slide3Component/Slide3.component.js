import SlideComponent from '../Slide.component';

import * as slide3 from './slide3.pug';
import * as slide3Style from './slide3.scss';

import {
  nodeListToArray,
} from '../../share/awesome.func.js';

// service
import JSMpeg from '../../share/jsmpeg/index';
import touchActive from '../../share/touchActiveMockClick.func';

// media
import * as videoTs0 from '../../../static/media/big_buck_bunny.ts';
import * as videoPoster0 from '../../../static/images/screenshot_big_buck_bunny.jpg';
import * as videoTs1 from '../../../static/media/Sony_test_video.ts';
import * as videoPoster1 from '../../../static/images/screenshot_Sony_test_video.jpg';

export default class Slide3Component extends SlideComponent {
  constructor({
                context,
                slideIndex,
              }) {
    super({
      context,
      slideIndex,
    });

    this.oVideoWrapper = null;
  };

  load() {
    return this.init({
      pugTemplate: slide3,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    })
      .then(() => {
        // 初始化第一个视频
        oVideoInstances[0] = initVideoIns(this.oVideoWrapper, oVideoUrls[0], oVideoPosters[0]);
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
            oVideoInstances[index] = initVideoIns(this.oVideoWrapper, oVideoUrls[index], oVideoPosters[index]);

            // 立即播放
            // oVideoInstances[index].player.play();
          });
      });
    });

    touchActive(this.aVideoChooseBtns);
  };


};

// private
let
  _style = slide3Style
  , oVideoInstances = []
  , oVideoUrls = [videoTs0, videoTs1]
  , oVideoPosters = [videoPoster0, videoPoster1]

  , initVideoIns = (videoWrapper, videoUrl, videoPoster) => new JSMpeg.VideoElement(videoWrapper, videoUrl, {
    poster: videoPoster,
    decodeFirstFrame: false,
    // aspectPercent: '56.25%',
    loop: false,
    // autoplay: true,
    progressive: true,
    chunkSize: 383 * 1023,
  })

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
