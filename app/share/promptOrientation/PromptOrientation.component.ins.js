import _style from './promptOrientation.scss';
import promptOrientation from './promptOrientation.pug';

import h5Pages from '@cycjimmy/h5-pages';
import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';
import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';

const _instance = new CreateInstance();

export default class {
  constructor() {
    if (_instance()) {
      return _instance();
    }

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(_style.wrapper);

    _instance(this);
  };

  load() {
    return functionToPromise(() => {
      this.wrapper.innerHTML = promptOrientation({
        _style,
        suggest: 'Turn to portrait for better experience.',
      });
    }).then(() => {
      h5Pages.root.appendChild(this.wrapper);
    });
  };

  disable() {
    this.wrapper.classList.add(_style.disable);
  };

  enable() {
    this.wrapper.classList.remove(_style.disable);
  };
};

