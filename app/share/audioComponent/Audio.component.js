import Templates from '../Templates';

import * as audio from './audio.pug';
import * as audioStyle from './audio.scss';

// service
import AudioService from './Audio.service';

export default class AudioComponent {
  constructor({
                context,
                audioSrc,
              }) {
    this.context = context;
    this.audioSrc = audioSrc;
    this.oMusicControlWrapper = document.createElement('a');

    this.context.style.position = 'relative';
    this.oMusicControlWrapper.href = 'javascript:;';
    this.oMusicControlWrapper.classList.add(_style.musicControlWrapper);
  }

  load() {
    // load flow
    return new Promise(resolve => {
      new Templates(audio, this.oMusicControlWrapper, {
        _style,
        audioSrc: this.audioSrc,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {

          this.context.appendChild(this.oMusicControlWrapper);

          // load service
          new AudioService({
            context: this.context,
            audioButton: this.oMusicControlWrapper,
          }).load();

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };


};

// private
let
  _style = audioStyle
;

