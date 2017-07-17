import * as slide4Style from './slide4.scss';

// service
import JSMpeg from '../share/jsmpeg/jsmpeg';
import * as videoTs from './media/big_buck_bunny.ts';


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
        loop: false,
        chunkSize: 1024 * 512,
      })
    ;

    // TODO 判断视频是否完成
    setInterval(() => {
      console.log('isPlaying: '+player.isPlaying+'\nwantsToPlay: '+player.wantsToPlay+'\nunpauseOnShow: '+player.unpauseOnShow);
    }, 1000);

    console.log(player);

    let unlockEvent = () => {
      player.audioOut.unlock(() => {
        console.log('audioOut unlocked!');
        document.body.removeEventListener('touchstart', unlockEvent);
      });
    };

    // 解锁音频
    document.body.addEventListener('touchstart', unlockEvent);

    canvas.addEventListener('click', () => {
      if (player.isPlaying) {
        console.log('pause');
        player.pause();
      } else {
        console.log('play');
        player.play();
      }
    });
  };
};

let
  _style = slide4Style
;