# h5 Webpack Starter
## Features
* Allow video inline play in Wechat(X5) browser.

## Based on 
* [swiper](https://github.com/nolimits4web/Swiper)
* [animate.css](https://github.com/daneden/animate.css)
* [fastclick](https://github.com/ftlabs/fastclick)
* [jsmpeg](https://github.com/phoboslab/jsmpeg)
* [Pwa Webpack Starter](https://github.com/cycjimmy/pwa-webpack-starter)

## Installation
```shell
$ npm install
# or
$ yarn install
```

## Encoding Video/Audio for [jsmpeg](https://github.com/phoboslab/jsmpeg) by [ffmpeg](https://ffmpeg.org/)
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

