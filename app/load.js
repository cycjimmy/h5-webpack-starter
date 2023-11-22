// global css
import '@/theme/main.scss';

import preloader from '@/preloader/preloader.component.ins';
import promptMobile from '@/popups/promptMobile/promptMobile.component.ins';

// polyfill
import '@/polyfill';

if (!DEVELOPMENT) {
  // Registering Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then((registration) => {
        console.log('SW registered: ', registration);
      }).catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}

if (DEVELOPMENT) {
  console.log('Development Mode');
  import('@cycjimmy/awesome-js-funcs/esm/handheld')
    .then((handheld) => {
      console.log(handheld.getBrowserInfo());
    });
}

if (PRODUCTION) {
  console.log('Production Mode');
}

document.addEventListener('readystatechange', () => {
  console.log(`documentReadyState: ${document.readyState}`);
});

Promise.resolve()
  .then(() => promptMobile.load())
  .then(() => preloader.load())
  .catch((e) => console.error(e));
