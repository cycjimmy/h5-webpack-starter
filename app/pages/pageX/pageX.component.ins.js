import { Page } from '@cycjimmy/h5-pages';

import template from './pageX.pug';
import _style from './pageX.scss';

export default new class extends Page {
  constructor() {
    super({
      name: 'pageX',
      renderHtml: template({ _style }),
    });
  }
}();
