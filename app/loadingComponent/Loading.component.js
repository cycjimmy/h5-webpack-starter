import h5Preloader from '@cycjimmy/h5-preloader';
import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';
import templateLoading from './loading.pug';
import _style from './loading.scss';
import imgLoading from '../../static/images/loading.svg';

const resources = [
  // require('../../static/images/').default,
];

export default class {
  constructor() {
    this.context = document.createElement('div');
    this.context.classList.add(_style.wrapper);
  };

  load() {
    return Promise.resolve()
      .then(() => this.render())
      .then(() => functionToPromise(() => {
        this.paramInit();
        this.h5Preloader.load();
      }));
  };

  render() {
    return functionToPromise(() => {
      this.context.innerHTML = templateLoading({_style, imgLoading});
      document.body.appendChild(this.context);
    });
  };

  paramInit() {
    this.progressBar = this.context.querySelector('.' + _style.loadingProgressbar);
    this.progressPercentText = this.context.querySelector('.' + _style.loadingTextPercent);
    this.h5Preloader = h5Preloader({
      progressBar: {
        eProgressBar: this.progressBar,
        eProgressBarPercent: this.progressPercentText,
      },
      resources,
      hookWhenProgressComplete: () => {
        this.context.classList.add('animated', 'slideOutUp');
        setTimeout(() => this.context.remove(), 2e3);
      },
      autoComplete: false,
    });
  };
};
