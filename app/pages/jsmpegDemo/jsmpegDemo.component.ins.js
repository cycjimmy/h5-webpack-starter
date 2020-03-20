import {Page, singleton} from '@cycjimmy/h5-pages';
import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';
import nodeListToArray from '@cycjimmy/awesome-js-funcs/typeConversion/nodeListToArray';
import touchActive from '../../share/touchActiveMockClick.func';
import bgm from '../../bgm.ins';

import template from './jsmpegDemo.pug';
import _style from './jsmpegDemo.scss';

const
  videoTs0 = 'https://cycjimmy.github.io/staticFiles/media/big_buck_bunny_640x360.ts'
  , videoTs1 = 'https://cycjimmy.github.io/staticFiles/media/Sony_test_video_640x360.ts'
  , videoPoster0 = 'https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg'
  , videoPoster1 = 'https://cycjimmy.github.io/staticFiles/images/screenshot/Sony_test_video_640x360.jpg'
  , oVideoInstances = []
  , oVideoUrls = [videoTs0, videoTs1]
  , oVideoPosters = [videoPoster0, videoPoster1]

  , destroyOtherVideoIns = () => functionToPromise(() => oVideoInstances.forEach((el, index) => {
    if (el) {
      el.destroy();
      oVideoInstances[index] = null;
    }
  }));

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'jsmpegDemo',
      renderHtml: template({_style}),
      pageLeave: () => {
        oVideoInstances.forEach((videoEl) => {
          if (videoEl) {
            videoEl.stop();
          }
        });
      }
    });

    this.oVideoWrapper = null;
    this.needContinuePlay = false;
    this.page.classList.add(_style.wrapper);
  };

  extraRender() {
    // Initialize the first video
    oVideoInstances[0] = this.initVideoIns(oVideoUrls[0], oVideoPosters[0]);
  }

  paramInit() {
    super.paramInit();

    this.oVideoWrapper = this.page.querySelector('.' + _style.videoWrapper);
    this.aVideoChooseBtns = nodeListToArray(this.page.querySelectorAll('.' + _style.videoChoose));
  };

  eventBind() {
    super.eventBind();

    this.aVideoChooseBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Is there an instance of itself being activated
        if (oVideoInstances[index]) {
          console.log('The video has been activated!');
          return;
        }

        // Destroy the original instance
        destroyOtherVideoIns()
          .then(() => {
            // create new instance
            oVideoInstances[index] = this.initVideoIns(oVideoUrls[index], oVideoPosters[index]);

            // play now
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
      loop: false,
      progressive: true,
      hooks: {
        play: () => {
          console.log('hookInPlay');

          if (bgm().isPlaying()) {
            this.needContinuePlay = true;
            bgm().pause();
          } else {
            this.needContinuePlay = false;
          }
        },
        pause: () => {
          console.log('hookInPause');
          if (this.needContinuePlay) {
            bgm().play();
          }
        },
      },
    });
  };
});

