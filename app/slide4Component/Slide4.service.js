import * as slide4Style from './slide4.scss';

// service
import JSMpeg from '../share/jsmpeg/jsmpeg';

// media
import * as videoTs from '../../static/media/big_buck_bunny.ts';

export default class Slide4Service {
  constructor(context) {
    this.context = context;     // 上下文
  };

  load() {
    let
      oVideo = this.context.querySelector('.' + _style.videoResponsive)
    ;

    // JSMpeg
    new JSMpeg.VideoElement(oVideo, videoTs, {
      loop: false,
      // autoplay: true,
      progressive: true,
      chunkSize: 1024 * 512,
    });
  };
};

let
  _style = slide4Style
;