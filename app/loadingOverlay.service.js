import QueryAll from './share/QueryAll';

export default class loadingOverlayService {
  constructor() {
  }

  load() {
    let
      oLoadingOverlay = new QueryAll('.loading-overlay')
    ;

    oLoadingOverlay.addClass('animated').addClass('slideOutUp');

    setTimeout(() => {
      oLoadingOverlay.remove();
    }, 2000);
  };
};
