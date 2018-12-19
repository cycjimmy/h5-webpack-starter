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
    const source = 'https://cycjimmy.github.io/staticFiles/media/Sony_test_video_vertical_720x1280.mp4';

    this.oPlayBtn = this.context.querySelector('.' + _style.playBtn);
    this.video = new H5VideoPlayer(source, {
      context: this.context,
      autoPlay: true,
      control: true,
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
      hookInStop: () => {
        console.log('hookInStop');
        if (this.needContinuePlay) {
          this.audioComponent.play();
        }
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

