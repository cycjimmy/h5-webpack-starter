export default class loadingOverlayService {
  constructor() {
  };

  load() {
    let
      oLoadingOverlay = document.querySelector('.loading-overlay')
    ;

    oLoadingOverlay.classList.add('animated', 'slideOutUp');

    setTimeout(() => {
      oLoadingOverlay.remove();
    }, 2000);
  };
};
