import QueryAll from '../../share/QueryAll';

import template from './cover.pug';
import _style from './cover.scss';

import {Page, singleton} from '@cycjimmy/h5-pages';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'cover',
      renderHtml: template({_style}),
    });
  }

  paramInit() {
    super.paramInit();

    this.oLogo = this.page.querySelector('.' + _style.logo);   // logo wrap
    this.oLogoImg = this.oLogo.firstElementChild;                        // logo img
  };

  eventBind() {
    super.eventBind();

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

  test() {
    this.oLogo.remove();
  }
});

