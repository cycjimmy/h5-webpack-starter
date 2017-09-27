import Component from '../share/Component';

import * as loading from './loading.pug';
import * as _style from './loading.scss';

// service
import ResLoaderService from '../share/loading/ResLoader.service';
import loadingOverlayServiceIns from '../share/loading/loadingOverlay.service.ins';

export default class extends Component {
  constructor() {
    super({
      context: document.querySelector('.loading-overlay'),
    });

    this.context.classList.add(_style.wrapper);
  };

  load() {
    return this.render({
      pugTemplate: loading,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    })
      .then(() => {
        this.paramInit();
        this.runLoading();
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
