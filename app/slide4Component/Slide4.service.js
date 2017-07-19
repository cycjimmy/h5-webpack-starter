import * as slide4Style from './slide4.scss';

// service
import JSMpeg from '../share/jsmpeg/jsmpeg';

// media
import * as videoTs0 from '../../static/media/big_buck_bunny.ts';
import * as videoPoster0 from '../../static/images/screenshot_big_buck_bunny.jpg';
import * as videoTs1 from '../../static/media/Sony_test_video.ts';
import * as videoPoster1 from '../../static/images/screenshot_Sony_test_video.jpg';

export default class Slide4Service {
  constructor(context) {
    this.context = context;     // 上下文
  };

  load() {
    let
      oVideoEl = this.context.querySelector('.' + _style.videoResponsive)
      , aVideoChooseBtns = this.context.querySelectorAll('.' + _style.videoChoose)
    ;

    Array.prototype.slice.call(aVideoChooseBtns).forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // 否有本身实例正在激活
        if (oVideoInstances[index]) {
          console.log('该视频激活状态');
          return;
        }

        // 销毁原有实例
        destroyOtherVideoIns();
        setTimeout(() => {
          oVideoInstances[index] = initVideoIns(oVideoEl, oVideoUrls[index], oVideoPosters[index]);
        }, 0);
      });
    });

    // 初始化第一个视频
    oVideoInstances[0] = initVideoIns(oVideoEl, oVideoUrls[0], oVideoPosters[0]);
  };
};

// private
let
  _style = slide4Style
  , oVideoInstances = []
  , oVideoUrls = [videoTs0, videoTs1]
  , oVideoPosters = [videoPoster0, videoPoster1]

  , initVideoIns = (videoEl, videoUrl, videoPoster) => new JSMpeg.VideoElement(videoEl, videoUrl, {
    poster: videoPoster,
    decodeFirstFrame: false,
    loop: false,
    // autoplay: true,
    progressive: true,
    chunkSize: 384 * 1024,
  })

  , destroyOtherVideoIns = () => {
    oVideoInstances.forEach((el, index) => {
      if (el) {
        el.destroy();
        oVideoInstances[index] = null;
      }
    });
  }
;