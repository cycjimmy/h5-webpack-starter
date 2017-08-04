// global css
import './theme/main.scss';

import FastClick from 'fastclick';
import webInitialize from './webInitialize.afunc';

// service
import loadingOverlayServiceIns from './share/loadingOverlay.service.ins';

// loading
new loadingOverlayServiceIns().init(document.querySelector('.loading-overlay'));

// wechatShare
// import './weChatShare';

if (DEVELOPMENT) {
  console.log('Development Mode');
}
if (PRODUCTION) {
  console.log('Production Mode');
}

// contextMenu preventDefault
document.addEventListener('contextmenu', e => {
  window.event.returnValue = false;
  e.preventDefault();
  return false;
});

// web page init
document.addEventListener('DOMContentLoaded', () => {
  // bind fastClick
  FastClick.attach(document.body);

  // web init
  webInitialize();
}, false);
