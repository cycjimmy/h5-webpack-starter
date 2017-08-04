import QueryAll from '../share/QueryAll';
import * as slide0Style from './slide0.scss';

export default class Slide0Service {
  constructor(element) {
    this.context = element;
    this.slideIndex = 0;
  }

  load(mainSwiper) {
    this.eventBind(mainSwiper);
  };

  eventBind(mainSwiper) {
    let
      oLogo = this.context.querySelector('.' + _style.logo)   // logo wrap
      , oLogoImg = oLogo.firstElementChild                    // logo img
    ;

    mainSwiper.on('slideChangeEnd', () => {
      if (mainSwiper.realIndex === this.slideIndex) {
        console.log('slide' + this.slideIndex);
      }
    });

    new QueryAll(oLogoImg)
      .on('touchstart mouseover mousedown', () => {
        oLogoImg.classList.add(_style.animationPaused);
        oLogo.classList.add(_style.enlarge);
      })
      .on('touchmove touchend touchcancel mouseout mouseup', () => {
        if (oLogoImg.classList.contains(_style.animationPaused)) {
          oLogoImg.classList.remove(_style.animationPaused);
        }
        if (oLogo.classList.contains(_style.enlarge)) {
          oLogo.classList.remove(_style.enlarge);
        }
      });

  };
};

// private
let
  _style = slide0Style
;
