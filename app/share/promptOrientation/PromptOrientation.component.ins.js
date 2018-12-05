import _style from './promptOrientation.scss';
import promptOrientation from './promptOrientation.pug';

// constructor
import CreateInstance from 'awesome-js-funcs/designPattern/CreateInstance';

const _instance = new CreateInstance();

export default class PromptOrientationComponentIns {
  constructor() {
    if (_instance()) {
      return _instance();
    }

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(_style.wrapper);

    _instance(this);
  };

  load() {
    return new Promise(resolve => {
      this.wrapper.innerHTML = promptOrientation({
        _style,
        suggest: 'Turn to portrait for better experience.',
      });

      setTimeout(() => {
        document.body.appendChild(this.wrapper);
        resolve();
      }, 0);
    });
  };

  disable() {
    this.wrapper.classList.add(_style.disable);
  };

  enable() {
    this.wrapper.classList.remove(_style.disable);
  };
};

