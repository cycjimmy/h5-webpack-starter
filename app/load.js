// global css
import './theme/main.scss';

// services
import preventDefault from '@cycjimmy/awesome-js-funcs/event/preventDefault';

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

// component
import LoadingComponent from './loadingComponent/Loading.component';
import PromptMobileComponentIns from './share/promptMobile/PromptMobile.component.ins';

document.addEventListener('readystatechange', () => {
  console.log('documentReadyState: ' + document.readyState);
});

// preload
// import './preload';

Promise.resolve()
  .then(() => new PromptMobileComponentIns().load())
  .then(() => new LoadingComponent().load())
  .catch(e => console.error(e));
