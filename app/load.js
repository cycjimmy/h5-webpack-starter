// global css
import './theme/main.scss';

// service
import ResLoaderService from './share/loading/ResLoader.service';
import loadingOverlayServiceIns from './share/loading/loadingOverlay.service.ins';


document.addEventListener('readystatechange', () => {
  console.log('documentReadyState: ' + document.readyState);
});

// loading
new ResLoaderService({
  resources: [
    // require(''),
  ],
  onStart: (total) => {
    console.log('loadStart: ' + total);
    let
      oLoadingOverlay = document.querySelector('.loading-overlay')
      , progressBar = oLoadingOverlay.querySelector('.loading-progressbar')
      , progressPercentText = oLoadingOverlay.querySelector('.loading-text-percent')
    ;

    new loadingOverlayServiceIns()
      .init({
        oLoadingOverlay,
        progressBar,
        progressPercentText,
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


