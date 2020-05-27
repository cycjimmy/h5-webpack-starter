import h5Preloader from '@cycjimmy/h5-preloader';
import h5Pages from '@cycjimmy/h5-pages';
import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';

import resources from './resources';
import template from './preloader.pug';
import _style from './preloader.scss';
import imgLoading from '../../static/images/loading.svg';

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
      this.context.innerHTML = template({_style, imgLoading});
      h5Pages.root.appendChild(this.context);
    });
  };

  paramInit() {
    this.progressBar = this.context.querySelector(`.${_style.loadingProgressbar}`);
    this.progressPercentText = this.context.querySelector(`.${_style.loadingTextPercent}`);
    this.h5Preloader = h5Preloader({
      progressBar: {
        eProgressBar: this.progressBar,
        eProgressBarPercent: this.progressPercentText,
      },
      resources,
      hookWhenProgressComplete: () => {
        this.context.classList.add('animate__animated', 'animate__slideOutUp');
        setTimeout(() => this.context.remove(), 2e3);
      },
      autoComplete: false,
    });
  };
};
