// constructor
import CreateInstance from 'awesome-js-funcs/designPattern/CreateInstance';

let
  _instance = new CreateInstance()
;

export default class loadingOverlayService {
  constructor() {
    if (_instance()) {
      return _instance();
    }
    this.oLoadingOverlay = null;
    this.progressBar = null;
    this.progressPercentText = null;
    this.percent = 0;
    _instance(this);
  };

  init({
         oLoadingOverlay,
         progressBar,
         progressPercentText,
       }) {
    this.oLoadingOverlay = oLoadingOverlay;
    this.progressBar = progressBar;
    this.progressPercentText = progressPercentText;

    return this;
  };

  setProgress(percent) {
    if (percent > this.percent) {
      this.percent = percent;

      if (this.progressBar) {
        this.progressBar.style.transform = 'scaleX(' + percent / 100 + ')';
      }

      if (this.progressPercentText) {
        this.progressPercentText.textContent = percent;
      }
    }

    return this;
  };

  progressComplete() {
    window.addEventListener('load', () => {
      this.setProgress(98);
      console.log('loading progress complete');
    });

    return this;
  };

  remove() {
    this.oLoadingOverlay.classList.add('animated', 'slideOutUp');

    setTimeout(() => {
      this.oLoadingOverlay.remove();
    }, 2000);
  };

  /**
   * doRemove
   * @returns {Promise.<TResult>}
   */
  doRemove() {
    return new Promise((resolve, reject) => {
      if (document.readyState === 'complete') {
        this.setProgress(100);
        setTimeout(() => {
          this.remove();
          console.log('loading overlay complete');
          resolve('loaded');
        }, 200);
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
          return this.doRemove();
        });
  };
};