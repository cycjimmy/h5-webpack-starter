// global css
import './theme/main.scss';

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

document.addEventListener('readystatechange', () => {
  console.log('documentReadyState: ' + document.readyState);
});

// preload
// import './preload';

Promise.resolve()
  .then(() => new PromptMobileComponentIns().load())
  .then(() => new PreloaderComponent().load())
  .catch(e => console.error(e));
