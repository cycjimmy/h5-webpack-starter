import QueryAll from '../share/QueryAll';
import * as slide1Style from './slide1.scss';

export default class Slide1Service {
  constructor(element) {
    this.context = element;
  }

  load() {
    this.eventBind();
  };

  eventBind() {
    let
      oLogo = this.context.querySelector('.' + slide1Style.logo)   // logo wrap
      , oLogoImg = oLogo.firstElementChild                         // logo img
    ;

    new QueryAll(oLogoImg)
      .on('touchstart mouseover mousedown', () => {
        oLogoImg.classList.add(slide1Style.animationPaused);
        oLogo.classList.add(slide1Style.enlarge);
      })
      .on('touchmove touchend touchcancel mouseout mouseup', () => {
        if (oLogoImg.classList.contains(slide1Style.animationPaused)) {
          oLogoImg.classList.remove(slide1Style.animationPaused);
        }
        if (oLogo.classList.contains(slide1Style.enlarge)) {
          oLogo.classList.remove(slide1Style.enlarge);
        }
      });

  };
};