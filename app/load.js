// global css
import './theme/main.scss';

// services
import preventDefault from '@cycjimmy/awesome-js-funcs/event/preventDefault';

import PreloaderComponent from './preloader/Preloader.component';
import PromptMobileComponentIns from './share/promptMobile/PromptMobile.component.ins';

// polyfill
import './polyfill';

// offline runtime
if (!DEVELOPMENT) {
  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install();
}

if (DEVELOPMENT) {
  console.log('Development Mode');
  console.log(require('@cycjimmy/awesome-js-funcs/handheld').getBrowserInfo());
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// contextMenu preventDefault
document.addEventListener('contextmenu', preventDefault);

// fix ios native scrolling
document.body.addEventListener('touchmove', preventDefault, {passive: false});

document.addEventListener('readystatechange', () => {
  console.log('documentReadyState: ' + document.readyState);
});

// preload
// import './preload';

Promise.resolve()
  .then(() => new PromptMobileComponentIns().load())
  .then(() => new PreloaderComponent().load())
  .catch(e => console.error(e));
