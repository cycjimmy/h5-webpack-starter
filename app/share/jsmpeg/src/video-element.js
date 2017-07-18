import Player from './player';
import iconPlay from './videoElement/play.svg';
import iconSound from './videoElement/sound.svg';

let VideoElement = function (element, videoUrl, options) {
  // Setup the div container, canvas and play button
  var addStyles = function (element, styles) {
    for (var name in styles) {
      element.style[name] = styles[name];
    }
  };

  this.container = element;

  addStyles(this.container, {
    position: 'relative',
    minWidth: '80px',
  });

  this.canvas = document.createElement('canvas');
  // this.canvas.width = 960;
  // this.canvas.height = 540;
  addStyles(this.canvas, {
    position: 'absolute',
    top: '0',
    left: '0',
    display: 'block',
    width: '100%',
  });
  this.container.appendChild(this.canvas);

  this.playButton = document.createElement('div');
  this.playButton.innerHTML = VideoElement.PLAY_BUTTON;
  addStyles(this.playButton, {
    zIndex: 2, position: 'absolute',
    top: '0', bottom: '0', left: '0', right: '0',
    maxWidth: '60px', maxHeight: '60px',
    margin: 'auto',
    opacity: '0.7',
    cursor: 'pointer'
  });
  this.container.appendChild(this.playButton);

  // Parse the data-options - we try to decode the values as json. This way
  // we can get proper boolean and number values. If JSON.parse() fails,
  // treat it as a string.
  let PlayerOptions = Object.assign(options, {
    canvas: this.canvas,
  });

  // Create the player instance
  this.player = new Player(videoUrl, PlayerOptions, {
    play: () => {
      this.playButton.style.display = 'none';
      if (this.poster) {
        this.poster.style.display = 'none';
      }
    },
    pause: () => {
      this.playButton.style.display = 'block';
    },
  });

  element.playerInstance = this.player;

  // Setup the poster element, if any
  if (options.poster && !options.autoplay && !this.player.options.streaming) {
    options.decodeFirstFrame = false;
    this.poster = new Image();
    this.poster.src = options.poster;
    this.poster.addEventListener('load', this.posterLoaded);
    addStyles(this.poster, {
      display: 'block', zIndex: 1, position: 'absolute',
      top: 0, left: 0, bottom: 0, right: 0
    });
    this.container.appendChild(this.poster);
  }

  // Add the click handler if this video is pausable
  if (!this.player.options.streaming) {
    this.container.addEventListener('click', this.onClick.bind(this));
  }

  // Hide the play button if this video immediately begins playing
  if (options.autoplay || this.player.options.streaming) {
    this.playButton.style.display = 'none';
  }

  // Set up the unlock audio buton for iOS devices. iOS only allows us to
  // play audio after a user action has initiated playing. For autoplay or
  // streaming players we set up a muted speaker icon as the button. For all
  // others, we can simply use the play button.
  if (this.player.audioOut && !this.player.audioOut.unlocked) {
    var unlockAudioElement = this.container;

    if (options.autoplay || this.player.options.streaming) {
      this.unmuteButton = document.createElement('div');
      this.unmuteButton.innerHTML = VideoElement.UNMUTE_BUTTON;
      addStyles(this.unmuteButton, {
        zIndex: 2, position: 'absolute',
        bottom: '0', right: '0',
        padding: '15px',
        width: '25px', height: '25px',
        opacity: '0.7',
        cursor: 'pointer'
      });
      this.container.appendChild(this.unmuteButton);
      unlockAudioElement = this.unmuteButton;
    }

    this.unlockAudioBound = this.onUnlockAudio.bind(this, unlockAudioElement);
    unlockAudioElement.addEventListener('touchstart', this.unlockAudioBound, false);
    unlockAudioElement.addEventListener('click', this.unlockAudioBound, true);
  }
};

VideoElement.prototype.onUnlockAudio = function (element, ev) {
  if (this.unmuteButton) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  this.player.audioOut.unlock(function () {
    if (this.unmuteButton) {
      this.unmuteButton.style.display = 'none';
    }
    element.removeEventListener('touchstart', this.unlockAudioBound);
    element.removeEventListener('click', this.unlockAudioBound);
  }.bind(this));
};

VideoElement.prototype.onClick = function (ev) {
  if (this.player.isPlaying) {
    this.player.pause();
  }
  else {
    this.player.play();
  }
};

// 自定义清理
VideoElement.prototype.destroy = function () {
  this.player.destroy();
  this.container.innerHTML = '';
};

VideoElement.PLAY_BUTTON = `<img style="display: block;max-width: 60px;max-height: 60px;" src=${iconPlay} alt="play-icon">`;
VideoElement.UNMUTE_BUTTON = `<img style="display: block;width: 25px;max-height: 25px;" src=${iconSound} alt="sound-icon">`;

export default VideoElement;

