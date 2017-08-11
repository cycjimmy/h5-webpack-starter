import Component from '../Component';

import * as audio from './audio.pug';
import * as _style from './audio.scss';

/**
 * AudioComponent
 *
 * Property:
 * context
 * audioSrc
 * audioElement:{
 *   audioButton
 *   audio
 *   audioPic
 * }
 *
 * Function:
 * play
 * pause
 * changeUIToPlay
 * changeUIToPause
 * isPlaying
 */

export default class AudioComponent extends Component {
  constructor({
                context,
                audioSrc,
              }) {
    super({
      context,
    });
    this.context.style.position = 'relative';
    this.audioSrc = audioSrc;

    this.audioElement = {
      audioButton: document.createElement('a'),
      audio: null,
      audioPic: null,
    };

    this.audioElement.audioButton.href = 'javascript:;';
    this.audioElement.audioButton.classList.add(_style.musicControlWrapper);
  };

  load() {
    return this.render({
      pugTemplate: audio,
      wrapperElement: this.audioElement.audioButton,
      insetParam: {
        _style,
        audioSrc: this.audioSrc,
      },
    })
      .then(() => {
        return new Promise(resolve => {
          this.context.appendChild(this.audioElement.audioButton);

          this.audioElement.audioPic = this.audioElement.audioButton.querySelector('.' + _style.musicControl);
          this.audioElement.audio = this.audioElement.audioPic.querySelector('audio');

          this.runAutoPlay();
          this.eventBind();

          setTimeout(() => {
            resolve();
          }, 50);
        });
      })
      .then(() => {
        return new Promise(resolve => {
          // Does not support auto play
          if (!this.isPlaying()) {
            this.audioElement.audio.pause();
            this.changeUIToPause();
          }

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };

  eventBind() {
    this.audioElement.audioButton.addEventListener('click', (e) => {
      e.stopPropagation();

      if (this.audioElement.audioPic.classList.contains(_style.play)) {
        // 正在播放
        this.pause();
      } else {
        // 暂停中
        this.play();
      }
    });
  };

  play() {
    this.audioElement.audio.play();
    this.changeUIToPlay();
  };

  pause() {
    this.audioElement.audio.pause();
    this.changeUIToPause();
  };

  runAutoPlay() {
    this.audioElement.audio.play();
    document.addEventListener("WeixinJSBridgeReady", () => {
      this.audioElement.audio.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', () => {
      this.audioElement.audio.play();
    }, false);
  };

  changeUIToPlay() {
    this.audioElement.audioPic.classList.remove(_style.pause);
    this.audioElement.audioPic.classList.add(_style.play);
  };

  changeUIToPause() {
    this.audioElement.audioPic.classList.remove(_style.play);
    this.audioElement.audioPic.classList.add(_style.pause);
  };

  isPlaying() {
    return !this.audioElement.audio.paused;
  };
};