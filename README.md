# h5 Webpack Starter

[![Build Status](https://travis-ci.org/cycjimmy/h5-webpack-starter.svg?branch=master)](https://travis-ci.org/cycjimmy/h5-webpack-starter)

## Features
* Perfect for loading service.
* Easy to load animation.
* Allow video inline play in Wechat(X5) browser.

## Based on 
* [swiper](https://github.com/nolimits4web/Swiper)
* [animate.css](https://github.com/daneden/animate.css)
* [fastclick](https://github.com/ftlabs/fastclick)
* [JSMpeg Player](https://github.com/cycjimmy/jsmpeg-player)
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


### H5 Canvas Video Introduce([JSMpeg Player](https://github.com/cycjimmy/jsmpeg-player)):
* JSMpeg player is based on [jsmpeg](https://github.com/phoboslab/jsmpeg).
* The video must be compressed into the TS format of MPEG1 / MP2.
* Apple device automatically plays without sound, you need to guide the user to click on the video in the lower right corner of the video icon to unlock the sound.(no similar problem in non-autoplay mode)

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