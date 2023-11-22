import { Page } from '@cycjimmy/h5-pages';

import template from './basedOn.pug';
import _style from './basedOn.scss';
import commonStyle from '@/pages/common.scss';

export default new class extends Page {
  constructor() {
    super({
      name: 'basedOn',
      renderHtml: template({
        _style,
        commonStyle,
      }),
    });
  }
}();
