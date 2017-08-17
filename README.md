# h5 Webpack Starter
## Features
* Perfect for loading service.
* Easy to load animation.
* Allow video inline play in Wechat(X5) browser.

## Based on 
* [swiper](https://github.com/nolimits4web/Swiper)
* [animate.css](https://github.com/daneden/animate.css)
* [fastclick](https://github.com/ftlabs/fastclick)
* [jsmpeg](https://github.com/phoboslab/jsmpeg)
* [three.js](https://github.com/mrdoob/three.js)
* [Pwa Webpack Starter](https://github.com/cycjimmy/pwa-webpack-starter)

## Installation
```shell
$ npm install
# or
$ yarn install
```

## Main directory structure
```text
h5-webpack-starter
 │
 ├─app/                        # Project entry folder
 │   └─...
 ├─gulp/                       # Gulp tasks folder
 │   └─...
 ├─mock/                       # Mock data entry folder
 │   ├─api/
 │   └─webSocket/
 ├─static/                     # Static folder
 │   ├─media/                  # Media folder
 │   ├─images/                 # Pictures folder
 │   ├─view/                   # Static pug template folder
 │   │   └──...
 │   └─favicon.ico             # Icon file
 ├─webpack/                    # Webpack configuration folder
 │   ├─browserSync.config.js   # BrowserSync config file
 │   ├─postcss.config.js       # Postcss config file
 │   └─...                     # Webpack configuration files
 ├─gulpfile.js                 # Gulp file entry
 └─...
```

## Main Tasks
```shell
# Run in development
$ npm start

# Build for production
$ npm run build
# or
$ npm run build:watch

# svg icon
$ npm run svg

# deploy to gh-pages
$ npm run deploy
```

## Some Functional Instructions
### [Loading Service](./app/share/loading)
#### ResLoaderService(Easy picture resource preloading progress service)
* Properties:
  * `baseUrl`
  * `resources`: Resource path array
  * `onStart`: The callback function for start, passing in the parameters `total`.
  * `onProgress`: The callback function for an image being loaded, passing in the parameters `currentIndex`, `total`.
  * `onComplete`: The callback function for all images load complete, passing in the parameters `total`.

#### loadingOverlayService
* Properties:
  * `oLoadingOverlay`
  * `progressBar`
  * `progressPercentText`
  * `percent`

* Functions:
  * `init()` Initialize service
  * `setProgress()` Set the progress
  * `progressComplete()`: All images loaded
  * `doRemove()`: Remove oLoadingOverlay


### H5 Canvas Video Introduce(jsmpeg):
* The player is based on [jsmpeg](https://github.com/phoboslab/jsmpeg).([my source](https://github.com/cycjimmy/h5-webpack-starter/tree/master/app/share/jsmpeg))
* The video must be compressed into the TS format of MPEG1 / MP2.
* Apple device automatically plays without sound, you need to guide the user to click on the video in the lower right corner of the video icon to unlock the sound.(no similar problem in non-autoplay mode)

#### Encoding Video/Audio for [jsmpeg](https://github.com/phoboslab/jsmpeg) by [ffmpeg](https://ffmpeg.org/)
```shell
$ ffmpeg -i input.mp4 -f mpegts
         -codec:v mpeg1video -s 640x360 -b:v 600k -r 25 -bf 0
         -codec:a mp2 -ar 44100 -ac 1 -b:a 64k
         output.ts
```

* options
  * `-s`: video size
  * `-b:v`: video bit rate
  * `-r`: frame rate
  * `-ar`: sampling rate
  * `-ac`: number of audio channels
  * `-b:a`: audio bit rate

#### How to use my jsmpeg by ES6
1. Copy [my jsmpeg source](https://github.com/cycjimmy/h5-webpack-starter/tree/master/app/share/jsmpeg) to your own project.

2. Use ES6 import. E.g:
  ```javascript
  import JSMpeg from '../share/jsmpeg';
  ```

3. Init my jsmpeg
  ```javascript
  let
    // Html Element for videoWrapper.
    videoWrapper = document.getElementById('videoWrapper')
    , videoUrl = '../static/media/test_video.ts'
  ;

  new JSMpeg.VideoElement(videoWrapper, videoUrl, {
    // the poster of video(Recommended to set it manually)
    poster: '../static/images/screenshot_test.jpg',

    // Aspect ratio converted to percentage.
    // E.g: '16:9' => '56.25%'
    // default: '56.25%'
    aspectPercent: '56.25%',

    // picture node (no playButton)
    // default: false
    picMode: true,

    // The player sets the hook when playing/pause/stop
    hookInPlay: () => {},
    hookInPause: () => {},
    hookInStop: () => {},

    // other options are the same as JSMpeg.Player
    // https://github.com/phoboslab/jsmpeg
  })
  ```

### [Audio Component](./app/share/audioComponent)
* Properties:
  * `context`
  * `audioSrc`
  * `audioElement`
    * `audioButton`
    * `audio`
    * `audioPic`

* Functions:
  * `play()`: audio play
  * `pause()`: audio pause
  * `changeUIToPlay()`: UI changes when audio playing
  * `changeUIToPause()`: UI changes when audio paused
  * `isPlaying()`: return Whether audio is playing