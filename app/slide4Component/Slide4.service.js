import * as slide4Style from './slide4.scss';

// service
import CanvasVideoPlayer from '../share/CanvasVideoPlayer/CanvasVideoPlayer';


export default class Slide4Service {
  constructor() {
  };

  load() {
    new CanvasVideoPlayer({
      videoSelector: '.' + _style.video,
      canvasSelector: '.' + _style.canvas,
      timelineSelector: '.' + _style.videoTimeline,
      audio: true,
    });
  };
};

let
  _style = slide4Style
;