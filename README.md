# h5 Webpack Starter

![][workflows-badge-image]
[![build status][travis-image]][travis-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]

* A webpack starter for h5 building. [Demo][github-pages-url]

## Features
* Perfect for loading service.
* Easy to load animation.
* Allow video inline play in Wechat(X5) browser.

## Based on 
* [Swiper](https://github.com/nolimits4web/Swiper)
* [H5 Pages](https://github.com/cycjimmy/h5-pages)
* [H5 Preloader](https://github.com/cycjimmy/h5-preloader)
* [Swiper Animation](https://github.com/cycjimmy/swiper-animation)
* [Animate.css](https://github.com/daneden/animate.css)
* [Fastclick](https://github.com/ftlabs/fastclick)
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

<!-- Links: -->
[workflows-badge-image]: https://github.com/cycjimmy/h5-webpack-starter/workflows/Test%20CI/badge.svg
[travis-image]: https://img.shields.io/travis/cycjimmy/h5-webpack-starter
[travis-url]: https://travis-ci.org/cycjimmy/h5-webpack-starter
[libraries-status-image]: https://img.shields.io/librariesio/release/github/cycjimmy/h5-webpack-starter
[libraries-status-url]: https://libraries.io/github/cycjimmy/h5-webpack-starter
[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/h5-webpack-starter
[release-url]: https://github.com/cycjimmy/h5-webpack-starter/releases
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[github-pages-url]: https://cycjimmy.github.io/h5-webpack-starter/
