// global css
import './theme/main.scss';

import preloader from './preloader/preloader.component.ins';
import promptMobile from './popups/promptMobile/promptMobile.component.ins';

// polyfill
import './polyfill';

// offline runtime
if (!DEVELOPMENT) {
  const OfflinePluginRuntime = require('@lcdp/offline-plugin/runtime');
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

Promise.resolve()
  .then(() => promptMobile.load())
  .then(() => preloader.load())
  .catch(e => console.error(e));
