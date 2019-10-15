import SlideComponent from '../Slide.component';
import instanceComponent from '../instanceComponent';

import slide from './h5videoPlayerDemo.pug';
import _style from './h5videoPlayerDemo.scss';

// service
import touchActive from '../../share/touchActiveMockClick.func';

const _instance = instanceComponent(class extends SlideComponent {
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

    this.needContinuePlay = false;
  };

  load() {
    return this.init({
      pugTemplate: slide,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    });
  };

  paramInit() {
    const source = 'https://cycjimmy.github.io/staticFiles/media/Sony_test_video_1280x720.mp4';

    this.oPlayBtn = this.context.querySelector('.' + _style.playBtn);
    this.video = new H5VideoPlayer(source, {
      context: this.context,
      autoPlay: true,
      preload: true,
      control: true,
      orientation: 'landscape',
      disableRotation: true,
      hooks: {
        play: () => {
          console.log('hook: play');

          if (this.audioComponent.isPlaying()) {
            this.needContinuePlay = true;
            this.audioComponent.pause();
          } else {
            this.needContinuePlay = false;
          }
        },
        pause: () => {
          console.log('hook: pause');
          if (this.needContinuePlay) {
            this.audioComponent.play();
          }
        },
        stop: () => {
          console.log('hook: stop');
          if (this.needContinuePlay) {
            this.audioComponent.play();
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
      this.context.querySelector('.' + _style.codeBtn),
    ]);
  };
});

export default (param) => _instance(param);

