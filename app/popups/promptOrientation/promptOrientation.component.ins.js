import { Popup } from '@cycjimmy/h5-pages';

import _style from './promptOrientation.scss';
import template from './promptOrientation.pug';

export default new class extends Popup {
  constructor() {
    super();
    this.popup.classList.add(_style.wrapper);
  }

  load() {
    return this.render(template({
      _style,
      suggest: 'Turn to portrait for better experience.',
    }));
  }

  disable() {
    this.popup.classList.add(_style.disable);
  }

  enable() {
    this.popup.classList.remove(_style.disable);
  }
}();
