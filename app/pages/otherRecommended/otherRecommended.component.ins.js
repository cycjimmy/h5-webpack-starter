import { Page } from '@cycjimmy/h5-pages';

import template from './otherRecommended.pug';
import _style from './otherRecommended.scss';
import commonStyle from '../common.scss';

export default new class extends Page {
  constructor() {
    super({
      name: 'otherRecommended',
      renderHtml: template({
        _style,
        commonStyle,
      }),
    });
  }
}();
