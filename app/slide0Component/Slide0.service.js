import QueryAll from '../share/QueryAll';
import * as slide0Style from './slide0.scss';

export default class Slide0Service {
  constructor({
                context,
                slideIndex,
              }) {
    this.context = context;
    this.slideIndex = slideIndex;
  };

  load(mainSwiper) {
    this.swiperCommand(mainSwiper);
    this.eventBind();
  };

  swiperCommand(mainSwiper) {
    mainSwiper.on('slideChangeEnd', () => {
      if (mainSwiper.realIndex === this.slideIndex) {
        console.log('slide' + this.slideIndex);
      }
    });
  };

  eventBind() {
    let
      oLogo = this.context.querySelector('.' + _style.logo)   // logo wrap
      , oLogoImg = oLogo.firstElementChild                    // logo img
    ;

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
