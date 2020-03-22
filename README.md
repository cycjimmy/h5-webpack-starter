# H5 Webpack Starter

![][workflows-badge-image]
[![build status][travis-image]][travis-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]

* A webpack starter for H5 building. [Demo][github-pages-url]

## Features
* Easily build H5 pages.
* Perfect for loading service.
* Easily run animation.
* Install components according to your needs.

## Based On 
* [Swiper](https://github.com/nolimits4web/Swiper)
* [H5 Pages](https://github.com/cycjimmy/h5-pages) **(Core Component)**
* [H5 Preloader](https://github.com/cycjimmy/h5-preloader)
* [Swiper Animation](https://github.com/cycjimmy/swiper-animation)
* [Animate.css](https://github.com/daneden/animate.css)
* [Fastclick](https://github.com/ftlabs/fastclick)

## Other Recommended Components
* [H5 Audio Controls](https://github.com/cycjimmy/h5-audio-controls)
* [JSMpeg Player](https://github.com/cycjimmy/jsmpeg-player)
* [H5 Video Player](https://github.com/cycjimmy/h5-video-player)
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
 │   ├─preloader/              # Preloader component folder
 │   ├─pages/                  # Pages folder
 │   ├─theme/                  # Global and public styles
 │   ├─share/                  # Public component or method
 │   └─...
 ├─mock/                       # Mock data entry folder
 │   ├─api/
 │   └─webSocket/
 ├─static/                     # Static folder
 │   ├─media/                  # Media folder
 │   ├─images/                 # Pictures folder
 │   │   ├─noUrl/
 │   │   └─... 
 │   ├─view/                   # Static pug template folder
 │   │   └─...
 │   └─favicon.ico             # Icon file
 ├─webpack/                    # Webpack configuration folder
 │   ├─browserSync.config.js   # BrowserSync config file
 │   ├─postcss.config.js       # Postcss config file
 │   ├─styleLoaders.config.js  # Loader configs file for styles 
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
