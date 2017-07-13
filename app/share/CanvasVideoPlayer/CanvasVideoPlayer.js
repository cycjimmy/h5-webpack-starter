/**
 * CanvasVideoPlayer
 * based on https://github.com/Stanko/html-canvas-video-player
 */


export default class CanvasVideoPlayer {
  /**
   * options
   * @param videoSelector
   * @param canvasSelector
   * @param framesPerSecond
   * @param hideVideo
   * @param autoplay
   * @param audio
   * @param timelineSelector
   * @param resetOnLastFrame
   * @param loop
   */
  constructor({
                videoSelector,
                canvasSelector,
                framesPerSecond = 25,
                hideVideo = true,
                autoplay = false,
                audio = false,
                timelineSelector = false,
                resetOnLastFrame = true,
                loop = false
              }) {

    this.options = {
      videoSelector: videoSelector,
      canvasSelector: canvasSelector,
      framesPerSecond: framesPerSecond,
      hideVideo: hideVideo,
      autoplay: autoplay,
      audio: audio,
      timelineSelector: timelineSelector,
      resetOnLastFrame: resetOnLastFrame,
      loop: loop
    };

    this.video = document.querySelector(this.options.videoSelector);
    this.canvas = document.querySelector(this.options.canvasSelector);
    this.timeline = document.querySelector(this.options.timelineSelector);
    this.timelinePassed = document.querySelector(this.options.timelineSelector + '> div');

    this.load();
  };

  load() {
    if (!this.options.videoSelector || !this.video) {
      console.error('No "videoSelector" property, or the element is not found');
      return;
    }

    if (!this.options.canvasSelector || !this.canvas) {
      console.error('No "canvasSelector" property, or the element is not found');
      return;
    }

    if (this.options.timelineSelector && !this.timeline) {
      console.error('Element for the "timelineSelector" selector not found');
      return;
    }

    if (this.options.timelineSelector && !this.timelinePassed) {
      console.error('Element for the "timelinePassed" not found');
      return;
    }

    if (this.options.audio) {
      if (typeof(this.options.audio) === 'string') {
        // Use audio selector from options if specified
        this.audio = document.querySelectorAll(this.options.audio)[0];

        if (!this.audio) {
          console.error('Element for the "audio" not found');
          return;
        }
      } else {
        // Creates audio element which uses same video sources
        this.audio = document.createElement('audio');
        this.audio.innerHTML = this.video.innerHTML;
        this.video.parentNode.insertBefore(this.audio, this.video);
        this.audio.load();
      }

      if (iOS) {
        // Autoplay doesn't work with audio on iOS
        // User have to manually start the audio
        this.options.autoplay = false;
      }
    }

    // Canvas context
    this.ctx = this.canvas.getContext('2d');

    this.playing = false;

    this.resizeTimeoutReference = false;
    this.RESIZE_TIMEOUT = 1000;

    this.init();
    this.bind();

  };

  init() {
    this.video.load();

    this.setCanvasSize();

    if (this.options.hideVideo) {
      this.video.style.display = 'none';
    }
  };

  jumpTo(percentage) {
    this.video.currentTime = this.video.duration * percentage;

    if (this.options.audio) {
      this.audio.currentTime = this.audio.duration * percentage;
    }
  };

  bind() {
    // Playes or pauses video on canvas click
    this.canvas.addEventListener('click', cvpHandlers.canvasClickHandler = () => {
      this.playPause();
    });

    // On every time update draws frame
    this.video.addEventListener('timeupdate', cvpHandlers.videoTimeUpdateHandler = () => {
      this.drawFrame();
      if (this.options.timelineSelector) {
        this.updateTimeline();
      }
    });

    // Draws first frame
    this.video.addEventListener('canplay', cvpHandlers.videoCanPlayHandler = () => {
      this.drawFrame();
    });

    // To be sure 'canplay' event that isn't already fired
    if (this.video.readyState >= 2) {
      this.drawFrame();
    }

    if (this.options.autoplay) {
      this.play();
    }

    // Click on the video seek video
    if (this.options.timelineSelector) {
      this.timeline.addEventListener('click', (e) => {
        let
          offset = e.clientX - _getOffset(this.canvas).left
          , percentage = offset / this.timeline.offsetWidth
        ;
        this.jumpTo(percentage);
      });
    }

    // Cache canvas size on resize (doing it only once in a second)
    window.addEventListener('resize', cvpHandlers.windowResizeHandler = () => {
      clearTimeout(this.resizeTimeoutReference);

      this.resizeTimeoutReference = setTimeout(() => {
        this.setCanvasSize();
        this.drawFrame();
      }, this.RESIZE_TIMEOUT);
    });
  };

  unbind() {
    this.canvas.removeEventListener('click', cvpHandlers.canvasClickHandler);
    this.video.removeEventListener('timeupdate', cvpHandlers.videoTimeUpdateHandler);
    this.video.removeEventListener('canplay', cvpHandlers.videoCanPlayHandler);
    window.removeEventListener('resize', cvpHandlers.windowResizeHandler);

    if (this.options.audio) {
      this.audio.parentNode.removeChild(this.audio);
    }
  };

  updateTimeline() {
    let
      percentage = (this.video.currentTime * 100 / this.video.duration).toFixed(2)
    ;

    this.timelinePassed.style.width = percentage + '%';
  };

  setCanvasSize() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
  };

  play() {
    this.lastTime = Date.now();
    this.playing = true;
    this.loop();

    if (this.options.audio) {
      // Resync audio and video
      this.audio.currentTime = this.video.currentTime;
      this.audio.play();
    }
  };

  pause() {
    this.playing = false;

    if (this.options.audio) {
      this.audio.pause();
    }
  };

  playPause() {
    if (this.playing) {
      this.pause();
    }
    else {
      this.play();
    }
  };

  loop() {

    let
      time = Date.now()
      , elapsed = (time - this.lastTime) / 1000
    ;

    // Render
    if (elapsed >= (1 / this.options.framesPerSecond)) {
      this.video.currentTime = this.video.currentTime + elapsed;
      this.lastTime = time;
      // Resync audio and video if they drift more than 300ms apart
      if (this.audio && Math.abs(this.audio.currentTime - this.video.currentTime) > 0.3) {
        this.audio.currentTime = this.video.currentTime;
      }
    }

    // If we are at the end of the video stop
    if (this.video.currentTime >= this.video.duration) {
      this.playing = false;

      if (this.options.resetOnLastFrame === true) {
        this.video.currentTime = 0;
      }

      if (this.options.loop === true) {
        this.video.currentTime = 0;
        this.play();
      }
    }

    if (this.playing) {
      this.animationFrame = requestAnimationFrame(() => {
        this.loop();
      });
    }
    else {
      cancelAnimationFrame(this.animationFrame);
    }
  };

  drawFrame() {
    this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
  };
};

// private
let
  cvpHandlers = {
    canvasClickHandler: null,
    videoTimeUpdateHandler: null,
    videoCanPlayHandler: null,
    windowResizeHandler: null
  }
  , iOS = /iPad|iPhone|iPod/.test(navigator.platform)
;

/**
 * Used most of the jQuery code for the .offset() method
 * @param elem
 * @returns {{top: number, left: number}}
 * @private
 */
let
  _getOffset = (elem) => {
    let
      docElem
      , rect
      , doc
    ;

    if (!elem) {
      return;
    }

    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none) or disconnected
    if (rect.width || rect.height || elem.getClientRects().length) {
      doc = elem.ownerDocument;
      docElem = doc.documentElement;

      return {
        top: rect.top + window.pageYOffset - docElem.clientTop,
        left: rect.left + window.pageXOffset - docElem.clientLeft
      };
    }
  };