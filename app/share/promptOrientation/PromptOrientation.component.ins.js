import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';
import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';
import h5Pages from '@cycjimmy/h5-pages';

import _style from './promptOrientation.scss';
import template from './promptOrientation.pug';

const instance = new CreateInstance();

export default class {
  constructor() {
    if (instance()) {
      return instance();
    }

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(_style.wrapper);

    instance(this);
  };

  load() {
    return Promise.resolve()
      .then(() => functionToPromise(() => {
        this.wrapper.innerHTML = template({
          _style,
          suggest: 'Turn to portrait for better experience.',
        });
      }))
      .then(() => h5Pages.root.appendChild(this.wrapper));
  };

  disable() {
    this.wrapper.classList.add(_style.disable);
  };

  enable() {
    this.wrapper.classList.remove(_style.disable);
  };
};

