// global css
import './theme/main.scss';

// component
import LoadingProgressComponentIns from './loadingProgressComponent/LoadingProgress.component.ins';

// service
import ResLoaderService from './share/resLoader/ResLoader.service';
import loadingOverlayServiceIns from './share/loadingOverlay.service.ins';


// loading
new ResLoaderService({
  resources: [
    require('../static/images/screenshot_Sony_test_video.jpg'),
    require('../static/images/screenshot_big_buck_bunny.jpg'),
  ],
  onStart: (total) => {
    console.log('loadStart: ' + total);
    new LoadingProgressComponentIns().setProgress(5);  // 5%
  },
  onProgress: (currentIndex, total) => {
    let
      percent = Number.parseInt(currentIndex / total * 90, 10) + 5
    ;

    console.log(currentIndex + ' / ' + total, 'percent:' + percent + '%');

    new LoadingProgressComponentIns().setProgress(percent);  // 5% ~ 95%
  },
  onComplete: (total) => {
    console.log('loadComplete: ' + total + ' resources');
    new LoadingProgressComponentIns().complete();  // 100%
    setTimeout(() => {
      new loadingOverlayServiceIns().init(document.querySelector('.loading-overlay'));
    }, 200)
  },
}).start();


