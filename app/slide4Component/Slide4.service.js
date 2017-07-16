import * as slide4Style from './slide4.scss';

// service
// import CanvasVideoPlayer from '../share/CanvasVideoPlayer/CanvasVideoPlayer';
import CanvasVideoPlayer from '../share/CanvasVideoPlayer/CanvasVideoPlayer.simp';
// import VideoJs from 'video.js/dist/video.es';


export default class Slide4Service {
  constructor(context) {
    this.context = context;     // 上下文
  };

  load() {
    // new CanvasVideoPlayer({
    //   videoSelector: '.' + _style.video,
    //   canvasSelector: '.' + _style.canvas,
    //   // timelineSelector: '.' + _style.videoTimeline,
    //   // audio: true,
    //   autoplay: true,
    // });

    // 原生画布渲染VIDEO

    let
      oVideo = document.querySelector('.' + _style.video)
      , oCanvas = document.querySelector('.' + _style.canvas)
      , nCanvasWidth = oCanvas.clientWidth
      , nCanvasHeight = oCanvas.clientHeight
    ;

    oCanvas.setAttribute('width', nCanvasWidth);
    oCanvas.setAttribute('height', nCanvasHeight);

    let
      ctx = oCanvas.getContext('2d')
    ;

    console.log(nCanvasWidth, nCanvasHeight, oVideo);

    oCanvas.addEventListener('click', () => {
      oVideo.play();
    });

    oVideo.addEventListener('play', () => {
      // myRequestAnimationFrame(() => {
      //   ctx.drawImage(oVideo, 0, 0, nCanvasWidth, nCanvasHeight);
      // });
      setInterval(()=>{
        ctx.drawImage(oVideo, 0, 0, nCanvasWidth, nCanvasHeight);
      },20);
    }, false);


    window.videojs(this.context.querySelector('.' + _style.nativeVideo), {
      // VideoJs('myVideo', {
      autoplay: false,
      controlBar: {
        captionsButton: false,
        chaptersButton: false,
        liveDisplay: false,
        playbackRateMenuButton: false,
        subtitlesButton: false
      }
    }, function () {
      // This is functionally the same as the previous example.
    });
  };
};

let
  _style = slide4Style
  , myRequestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame
;