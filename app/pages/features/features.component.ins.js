import {Page, singleton} from '@cycjimmy/h5-pages';

import template from './features.pug';
import _style from './features.scss';
import commonStyle from '../common.scss';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'features',
      renderHtml: template({
        _style,
        commonStyle,
      }),
    });
  };
});

