// constructor
import {
  CreateInstance
} from './awesome.func';

let
  _instance = new CreateInstance()
;

export default class loadingOverlayService {
  constructor() {
    if (_instance()) {
      return _instance();
    }
    this.oLoadingOverlay = null;
    this.isWindowLoaded = false;
    _instance(this);
  };

  init(oLoadingOverlay) {
    this.oLoadingOverlay = oLoadingOverlay;

    // setLoaded
    window.addEventListener('load', () => {
      this.isWindowLoaded = true;
    }, false);

    return this;
  };

  getLoaded() {
    return this.isWindowLoaded;
  };

  remove() {
    this.oLoadingOverlay.classList.add('animated', 'slideOutUp');

    setTimeout(() => {
      this.oLoadingOverlay.remove();
    }, 2000);
  };

  /**
   * load
   * @returns {Promise.<TResult>}
   */
  load() {
    return new Promise((resolve, reject) => {
      if (this.isWindowLoaded) {
        this.remove();
        resolve('loaded');
      } else {
        setTimeout(() => {
          reject();
        }, 1000);
      }
    })
      .then(
        () => {
          return Promise.resolve();
        },
        () => {
          return this.load();
        });
  };
};