import templateLoading from './loading.pug';
import _style from './loading.scss';
import h5Preloader from 'h5-preloader';

const resources = [
  // require('../../static/images/'),
];

export default class {
  constructor() {
    this.context = document.createElement('div');
    this.context.classList.add(_style.wrapper);
  };

  load() {
    return this.render()
      .then(() => {
        this.paramInit();
        this.h5Preloader.load();
      });
  };

  render() {
    return new Promise(resolve => {
      this.context.innerHTML = templateLoading({_style});
      document.body.appendChild(this.context);

      setTimeout(resolve, 0);
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
