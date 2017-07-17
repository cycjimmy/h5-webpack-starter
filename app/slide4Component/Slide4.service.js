import * as slide4Style from './slide4.scss';

// service
import JSMpeg from '../share/jsmpeg/jsmpeg';
import videoTs from './media/big_buck_bunny.ts';


export default class Slide4Service {
  constructor(context) {
    this.context = context;     // 上下文
  };

  load() {

    // JSMpeg
    let
      canvas = document.querySelector('.' + _style.canvas)
      , videoUrl = videoTs
      , player = new JSMpeg.Player(videoUrl, {
        canvas: canvas,
        progressive: true,
        chunkSize: 1024 * 512,
      })
    ;

    console.log(player);

    // 解锁音频
    document.body.addEventListener('touchstart', () => {
      player.audioOut.unlock(() => {
        console.log('audioOut unlocked!');
      });
    });

    canvas.addEventListener('click', () => {
      console.log('play');
      player.play();
    });
  };
};

let
  _style = slide4Style
;