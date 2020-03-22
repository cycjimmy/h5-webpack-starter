import {Page, singleton} from '@cycjimmy/h5-pages';

import template from './basedOn.pug';
import _style from './basedOn.scss';
import commonStyle from '../common.scss';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'basedOn',
      renderHtml: template({
        _style,
        commonStyle,
      }),
    });
  };
});

