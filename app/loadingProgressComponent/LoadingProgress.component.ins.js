// constructor
import {
  CreateInstance
} from '../share/awesome.func';

let
  _instance = new CreateInstance()
;

export default class LoadingProgressComponentIns {
  constructor() {
    if (_instance()) {
      return _instance();
    }
    this.context = document.querySelector('.loading-overlay');
    this.progressBar = this.context.querySelector('.loading-progressbar');
    this.progressText = this.context.querySelector('.loading-text-percent');
    _instance(this);
  };

  setProgress(percent) {
    this.progressBar.style.transform = 'scaleX(' + percent / 100 + ')';
    this.progressText.textContent = percent;
    return this;
  };

  complete() {
    window.addEventListener('load', () => {
      this.setProgress(100);
    });
  };
};