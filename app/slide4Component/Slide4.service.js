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
    new CanvasVideoPlayer({
      videoSelector: '.' + _style.video,
      canvasSelector: '.' + _style.canvas,
      // timelineSelector: '.' + _style.videoTimeline,
      // audio: true,
      autoplay: true,
    });




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
;