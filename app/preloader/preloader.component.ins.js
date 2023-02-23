import { Popup } from '@cycjimmy/h5-pages';
import h5Preloader from '@cycjimmy/h5-preloader';
import functionToPromise from '@cycjimmy/awesome-js-funcs/esm/typeConversion/functionToPromise';

// service
import storage from '../dataHandling/storage.service.ins';
// static
import resources from './resources';
import template from './preloader.pug';
import _style from './preloader.scss';
import imgLoading from '../../static/images/loading.svg';

export default new class extends Popup {
  constructor() {
    super();
    this.popup.classList.add(_style.wrapper);
  }

  load() {
    return Promise.resolve()
      .then(() => this.render(template({
        _style,
        imgLoading,
      })))
      .then(() => functionToPromise(() => {
        this.paramInit();
        this.h5Preloader.load();
      }))
      .then(() => functionToPromise(() => {
        storage.setState({
          isPreloaderInited: true,
        });
      }));
  }

  paramInit() {
    this.progressBar = this.popup.querySelector(`.${_style.loadingProgressbar}`);
    this.progressPercentText = this.popup.querySelector(`.${_style.loadingTextPercent}`);
    this.h5Preloader = h5Preloader({
      progressBar: {
        eProgressBar: this.progressBar,
        eProgressBarPercent: this.progressPercentText,
      },
      resources,
      hookWhenProgressComplete: () => {
        this.popup.classList.add('animate__animated', 'animate__slideOutUp');
        setTimeout(() => this.popup.remove(), 2e3);
      },
      autoComplete: false,
    });
  }
}();
