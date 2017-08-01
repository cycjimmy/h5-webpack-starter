# h5 Webpack Starter
## Features
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

## H5 Canvas Video Introduce(jsmpeg):
* The player is based on [jsmpeg](https://github.com/phoboslab/jsmpeg).([my source](https://github.com/cycjimmy/h5-webpack-starter/tree/master/app/share/jsmpeg))
* The video must be compressed into the TS format of MPEG1 / MP2.
* Apple device automatically plays without sound, you need to guide the user to click on the video in the lower right corner of the video icon to unlock the sound.(no similar problem in non-autoplay mode)

### Encoding Video/Audio for [jsmpeg](https://github.com/phoboslab/jsmpeg) by [ffmpeg](https://ffmpeg.org/)
```shell
$ ffmpeg -i input.mp4 -f mpegts
         -codec:v mpeg1video -s 640x360 -b:v 300k -r 24 -bf 0
         -codec:a mp2 -ar 32000 -ac 1 -b:a 64k
         output.ts
```

* options
  * `-s`: video size
  * `-b:v`: video bit rate
  * `-r`: frame rate
  * `-ar`: sampling rate
  * `-ac`: number of audio channels
  * `-b:a`: audio bit rate

### How to use my jsmpeg by ES6
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

    // other options are the same as JSMpeg.Player
    // https://github.com/phoboslab/jsmpeg
  })
  ```