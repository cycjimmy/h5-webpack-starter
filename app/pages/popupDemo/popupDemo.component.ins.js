import {Page} from '@cycjimmy/h5-pages';

import template from './popupDemo.pug';
import _style from './popupDemo.scss';
import popupX from '../../popups/popupX/popupX.component.ins';

export default new class extends Page {
  constructor() {
    super({
      name: 'popupDemo',
      renderHtml: template({_style}),
    });
  };

  paramInit() {
    super.paramInit();

    this.popupBtn = this.page.querySelector(`.${_style.popupBtn}`);
  };

  eventBind() {
    super.eventBind();

    this.popupBtn.addEventListener('click', () => popupX.load());
  };
};

