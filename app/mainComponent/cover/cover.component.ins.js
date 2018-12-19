import QueryAll from '../../share/QueryAll';
import SlideComponent from '../Slide.component';
import instanceComponent from '../instanceComponent';

import slide from './cover.pug';
import _style from './cover.scss';

const _instance = instanceComponent(class extends SlideComponent {
  constructor({
                context,
                mainSwiper,
                slideIndex,
                audioComponent,
              }) {
    super({
      context,
      mainSwiper,
      slideIndex,
      audioComponent,
    });
  };

  load() {
    return this.init({
      pugTemplate: slide,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    });
  };

  paramInit() {
    this.oLogo = this.context.querySelector('.' + _style.logo);   // logo wrap
    this.oLogoImg = this.oLogo.firstElementChild;                 // logo img
  };

  eventBind() {
    new QueryAll(this.oLogoImg)
      .on('touchstart mouseover mousedown', () => {
        this.oLogoImg.classList.add(_style.animationPaused);
        this.oLogo.classList.add(_style.enlarge);
      })
      .on('touchmove touchend touchcancel mouseout mouseup', () => {
        if (this.oLogoImg.classList.contains(_style.animationPaused)) {
          this.oLogoImg.classList.remove(_style.animationPaused);
        }
        if (this.oLogo.classList.contains(_style.enlarge)) {
          this.oLogo.classList.remove(_style.enlarge);
        }
      });
  };
});

export default (param) => _instance(param);

