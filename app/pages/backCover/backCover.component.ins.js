import {Page, changePageTo} from '@cycjimmy/h5-pages';

import template from './backCover.pug';
import _style from './backCover.scss';

import cover from '../cover/cover.component.ins';

export default new class extends Page {
  constructor() {
    super({
      name: 'backCover',
      renderHtml: template({_style}),
    });
  };

  paramInit() {
    super.paramInit();

    this.backBtn = this.page.querySelector(`.${_style.backBtn}`);
  };

  eventBind() {
    super.eventBind();

    this.backBtn.addEventListener('click', () => changePageTo(cover.name));
  };
};

