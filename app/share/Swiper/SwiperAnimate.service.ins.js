// based on swiper.animate(1.0.2)
// doc http://www.swiper.com.cn

// constructor
import {
  CreateInstance,
  nodeListToArray,
} from '../awesome.func';

let
  _instance = new CreateInstance()
;

export default class SwiperAnimateServiceIns {
  constructor() {
    if (_instance()) {
      return _instance();
    }
    this.allBoxes = [];
    _instance(this);
  };

  _clear() {
    return Promise.all(
      this.allBoxes.map(el => {
        return new Promise(resolve => {
          if (el.attributes['swiper-animate-style-cache']) {
            el.setAttribute('style', el.attributes['swiper-animate-style-cache'].value);
            el.style.visibility = 'hidden';
            el.classList.remove('animated');

            if (el.attributes['swiper-animate-effect']) {
              el.classList.remove(el.attributes['swiper-animate-effect'].value);
            }
          }
          setTimeout(() => resolve(), 0);
        });
      }),
    );
  };

  _cache() {
    // has cached
    if (this.allBoxes.length) {
      return Promise.resolve();
    }

    // start cache
    return new Promise(resolve => {
      this._initAllBoxes();
      setTimeout(() => resolve(), 0);
    })
      .then(() => {
        return new Promise(resolve => {
          this.allBoxes.forEach(el => {
            if (el.attributes['style']) {
              el.setAttribute('swiper-animate-style-cache', el.attributes['style'].value);
            } else {
              el.setAttribute('swiper-animate-style-cache', ' ');
              el.style.visibility = 'hidden';
            }
          });

          setTimeout(() => resolve(), 0);
        });
      });
  };

  animate(swiper) {
    return Promise.resolve()
      .then(() => this._cache())
      .then(() => this._clear())
      .then(() => {
        let
          activeBoxes = nodeListToArray(swiper.slides[swiper.realIndex].querySelectorAll('.ani'))
        ;

        return Promise.all(activeBoxes.map(el => {
          let
            style
            , effect = el.attributes['swiper-animate-effect']
            ? el.attributes['swiper-animate-effect'].value
            : ''
            , duration = el.attributes['swiper-animate-duration']
            ? el.attributes['swiper-animate-duration'].value
            : ''
            , delay = el.attributes['swiper-animate-delay']
            ? el.attributes['swiper-animate-delay'].value
            : ''
          ;

          el.style.visibility = 'visible';
          el.classList.add(effect, 'animated');

          style = el.attributes['style'].value;

          if (duration) {
            style += 'animation-duration:' + duration + ';-webkit-animation-duration:' + duration + ';';
          }

          if (delay) {
            style += 'animation-delay:' + delay + ';-webkit-animation-delay:' + delay + ';';
          }

          el.setAttribute('style', style);
        }));
      });
  };

  _initAllBoxes() {
    if (!this.allBoxes.length) {
      this.allBoxes = nodeListToArray(window.document.documentElement.querySelectorAll('.ani'));
    }
  };
};