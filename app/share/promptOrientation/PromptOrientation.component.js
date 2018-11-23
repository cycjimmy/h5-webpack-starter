import _style from './promptOrientation.scss';
import promptOrientation from './promptOrientation.pug';

export default class PromptOrientationComponent {
  constructor() {
    this.wrapper = document.createElement('div');
  };

  load() {
    return new Promise(resolve => {
      this.wrapper.classList.add(_style.wrapper);
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
};
