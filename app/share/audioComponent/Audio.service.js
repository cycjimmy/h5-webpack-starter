import * as audioStyle from './audio.scss';

export default class AudioService {
  constructor({
                context,
                audioButton,
              }) {
    this.context = context;
    this.audioButton = audioButton;
    this.eMusicControl = this.audioButton.querySelector('.' + _style.musicControl);
    this.oAudio = this.eMusicControl.querySelector('audio');
  };

  load() {
    this.runAutoPlay();
    this.eventBind();

    setTimeout(() => {
      // Does not support auto play
      if (!_isPlaying(this.oAudio)) {
        this.oAudio.pause();
        this.changeUIToPause();
      }
    }, 50);
  };

  runAutoPlay(){
    this.oAudio.play();
    document.addEventListener("WeixinJSBridgeReady", () => {
      this.oAudio.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', () => {
      this.oAudio.play();
    }, false);
  };

  eventBind() {
    this.audioButton.addEventListener('click', (e) => {
      e.stopPropagation();

      if (this.eMusicControl.classList.contains(_style.play)) {
        // 正在播放
        this.oAudio.pause();
        this.changeUIToPause();
      } else {
        // 暂停中
        this.oAudio.play();
        this.changeUIToPlay();
      }
    });
  };

  changeUIToPause() {
    this.eMusicControl.classList.remove(_style.play);
    this.eMusicControl.classList.add(_style.pause);
  };

  changeUIToPlay() {
    this.eMusicControl.classList.remove(_style.pause);
    this.eMusicControl.classList.add(_style.play);
  };


};

// private
let
  _style = audioStyle
  , _isPlaying = oAudio => !oAudio.paused
;
