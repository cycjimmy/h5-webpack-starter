// image
import loadingImg from '../../static/images/loading.svg';

// style
import _style from './loading.scss';

// service
import ResLoaderService from './ResLoader.service';
import loadingOverlayServiceIns from './loadingOverlay.service.ins';

export default class {
  constructor() {
    this.context = document.createElement('div');
    this.context.classList.add(_style.wrapper);
  };

  load() {
    return this.render()
      .then(() => {
        this.paramInit();
        this.runLoading();
      });
  };

  render() {
    return new Promise(resolve => {
      this.context.innerHTML = `
        <img class=${_style.loadingPic} src=${loadingImg}>
        
        <div class=${_style.loadingProgressWrapper}>
          <div class=${_style.loadingProgressbarWrapper}>
            <div class=${_style.loadingProgressbar}></div>
          </div>
        </div>
        
        <div class=${_style.loadingText}>
          <span class=${_style.loadingTextPercent}>0</span>&nbsp;%
        </div>
      `;

      document.body.appendChild(this.context);

      setTimeout(() => resolve(), 0);
    });
  };

  paramInit() {
    this.progressBar = this.context.querySelector('.' + _style.loadingProgressbar);
    this.progressPercentText = this.context.querySelector('.' + _style.loadingTextPercent);
  };

  runLoading() {
    // loading
    new ResLoaderService({
      resources: [
        // require('../../static/images/'),
      ],
      onStart: (total) => {
        console.log('loadStart: ' + total);

        new loadingOverlayServiceIns()
          .init({
            oLoadingOverlay: this.context,
            progressBar: this.progressBar,
            progressPercentText: this.progressPercentText,
          })
          .setProgress(4);      // 4%
      },
      onProgress: (currentIndex, total) => {
        let
          percent = Number.parseInt(currentIndex / total * 92, 10) + 4
        ;

        console.log(currentIndex + ' / ' + total, 'percent:' + percent + '%');

        new loadingOverlayServiceIns().setProgress(percent);  // 4% ~ 96%
      },
      onComplete: (total) => {
        console.log('loadComplete: ' + total + ' resources');
        new loadingOverlayServiceIns().progressComplete();    // 98%
      },
    }).start();
  };
};
