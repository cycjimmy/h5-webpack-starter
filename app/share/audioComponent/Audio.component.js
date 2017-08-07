import Component from '../Component';

import * as audio from './audio.pug';
import * as audioStyle from './audio.scss';

// service
import AudioService from './Audio.service';

export default class AudioComponent extends Component {
  constructor({
                context,
                audioSrc,
              }) {
    super({
      context,
    });
    this.context = context;
    this.audioSrc = audioSrc;
    this.oMusicControlWrapper = document.createElement('a');

    this.context.style.position = 'relative';
    this.oMusicControlWrapper.href = 'javascript:;';
    this.oMusicControlWrapper.classList.add(_style.musicControlWrapper);
  }

  load() {
    return this.render({
      pugTemplate: audio,
      wrapperElement: this.oMusicControlWrapper,
      insetParam: {
        _style,
        audioSrc: this.audioSrc,
      },
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

