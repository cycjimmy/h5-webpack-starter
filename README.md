# h5 Webpack Starter

[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]

[travis-image]: https://travis-ci.org/cycjimmy/h5-webpack-starter.svg?branch=master
[travis-url]: https://travis-ci.org/cycjimmy/h5-webpack-starter
[david-image]: https://img.shields.io/david/cycjimmy/h5-webpack-starter.svg?style=flat-square
[david-url]: https://david-dm.org/cycjimmy/h5-webpack-starter
[david-dev-image]: https://david-dm.org/cycjimmy/h5-webpack-starter/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycjimmy/h5-webpack-starter?type=dev

## Features
* Perfect for loading service.
* Easy to load animation.
* Allow video inline play in Wechat(X5) browser.

## Based on 
* [swiper](https://github.com/nolimits4web/Swiper)
* [animate.css](https://github.com/daneden/animate.css)
* [Swiper Animation](https://github.com/cycjimmy/swiper-animation)
* [h5-preloader](https://github.com/cycjimmy/h5-preloader)
* [fastclick](https://github.com/ftlabs/fastclick)
* [Pwa Webpack Starter](https://github.com/cycjimmy/pwa-webpack-starter)
* [JSMpeg Player](https://github.com/cycjimmy/jsmpeg-player)
* [H5 Video Player](https://github.com/cycjimmy/h5-video-player)
* [H5 Audio Controls](https://github.com/cycjimmy/h5-audio-controls)
* [Weixin Share](https://github.com/cycjimmy/weixin-share)

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
```
