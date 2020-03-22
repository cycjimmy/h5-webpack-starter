import {Page, singleton} from '@cycjimmy/h5-pages';

import QueryAll from '../../share/QueryAll';

import template from './cover.pug';
import _style from './cover.scss';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'cover',
      renderHtml: template({_style}),
      pageEnter() {
        this.logo.classList.remove(_style.animationPaused);
      },
      pageLeave() {
        this.logo.classList.add(_style.animationPaused);
      },
    });
  }

  paramInit() {
    super.paramInit();

    this.logo = this.page.querySelector(`.${_style.logo}`);
  };

  eventBind() {
    super.eventBind();

    new QueryAll(this.logo)
      .on('touchstart mouseover mousedown', () => {
        this.logo.classList.add(_style.animationPaused);
        this.logo.classList.add(_style.enlarge);
      })
      .on('touchmove touchend touchcancel mouseout mouseup', () => {
        this.logo.classList.remove(_style.animationPaused);
        this.logo.classList.remove(_style.enlarge);
      });
  };
});

