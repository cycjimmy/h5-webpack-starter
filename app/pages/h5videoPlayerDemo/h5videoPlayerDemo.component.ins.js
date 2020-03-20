import {Page, singleton} from '@cycjimmy/h5-pages';
import touchActive from '../../share/touchActiveMockClick.func';
import bgm from '../../bgm.ins';

import template from './h5videoPlayerDemo.pug';
import _style from './h5videoPlayerDemo.scss';
import staticFiles from '../../staticFiles';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'h5videoPlayerDemo',
      renderHtml: template({_style}),
    });

    this.needContinuePlay = false;
  };

  paramInit() {
    super.paramInit();

    this.oPlayBtn = this.page.querySelector('.' + _style.playBtn);

    this.video = new H5VideoPlayer(staticFiles.testVideo, {
      context: this.page,
      autoPlay: true,
      preload: true,
      control: true,
      orientation: 'landscape',
      disableRotation: true,
      hooks: {
        play: () => {
          console.log('hook: play');

          if (bgm().isPlaying()) {
            this.needContinuePlay = true;
            bgm().pause();
          } else {
            this.needContinuePlay = false;
          }
        },
        pause: () => {
          console.log('hook: pause');
          if (this.needContinuePlay) {
            bgm().play();
          }
        },
        stop: () => {
          console.log('hook: stop');
          if (this.needContinuePlay) {
            bgm().play();
          }
        },
      },
    });
  };

  eventBind() {
    this.oPlayBtn.addEventListener('click', () => {
      console.log('play button', this.video);
      this.video.load();
    });

    touchActive([
      this.oPlayBtn,
      this.page.querySelector('.' + _style.codeBtn),
    ]);
  };
});


