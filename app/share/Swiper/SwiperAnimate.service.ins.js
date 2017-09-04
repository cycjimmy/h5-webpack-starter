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
    this.allBoxes = null;
    this.isBusy = false;
    _instance(this);
  };

  init() {
    this.allBoxes = nodeListToArray(window.document.documentElement.querySelectorAll(".ani"));
  };

  clear() {
    return new Promise((resolve, reject) => {
      if (!this.isBusy) {
        if (!this.allBoxes) {
          this.init();
        }
        this.isBusy = true;
        resolve();
      } else {
        console.log('busy');
        setTimeout(() => {
          reject();
        }, 100);
      }
    })
      .then(
        () => {
          return Promise.all(
            this.allBoxes.map(el => {
              return new Promise(resolve => {
                if (el.attributes["swiper-animate-style-cache"]) {
                  el.setAttribute("style", el.attributes["swiper-animate-style-cache"].value);
                  el.style.visibility = "hidden";
                  el.classList.remove('animated');

                  if (el.attributes["swiper-animate-effect"]) {
                    el.classList.remove(el.attributes["swiper-animate-effect"].value);
                  }
                }
                setTimeout(() => resolve(), 0);
              });
            }),
          );
        },
        () => {
          return this.clear();
        });
  };

  cache() {
    if (!this.allBoxes) {
      this.init();
    }

    this.allBoxes.forEach(el => {
      if (el.attributes["style"]) {
        el.setAttribute("swiper-animate-style-cache", el.attributes["style"].value);
      } else {
        el.setAttribute("swiper-animate-style-cache", " ");
        el.style.visibility = "hidden";
      }
    });
  };

  animate(swiper) {
    this.clear()
      .then(() => {
        let
          activeBoxes = nodeListToArray(swiper.slides[swiper.realIndex].querySelectorAll(".ani"))
        ;

        return Promise.all(activeBoxes.map(el => {
          let
            style
            , effect = el.attributes["swiper-animate-effect"]
            ? el.attributes["swiper-animate-effect"].value
            : ""
            , duration = el.attributes["swiper-animate-duration"]
            ? el.attributes["swiper-animate-duration"].value
            : ""
            , delay = el.attributes["swiper-animate-delay"]
            ? el.attributes["swiper-animate-delay"].value
            : ""
          ;

          el.style.visibility = "visible";
          el.classList.add(effect, 'animated');

          style = el.attributes["style"].value;

          if (duration) {
            style += "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";";
          }

          if (delay) {
            style += "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";";
          }

          el.setAttribute("style", style);
        }));
      })
      .then(() => {
        this.isBusy = false;
      });
  };
};