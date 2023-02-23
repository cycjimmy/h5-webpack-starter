import delayForPromise from '@cycjimmy/awesome-js-funcs/esm/function/delayForPromise';

// components
import root from './pages/root';
import promptOrientation from './popups/promptOrientation/promptOrientation.component.ins';
// services
import weChatShare from './shared/weChatShare';
import storage from './dataHandling/storage.service.ins';

export default () => Promise.resolve()
  .then(() => Promise.all([
    weChatShare(),
    promptOrientation.load(),
    (() => {
      // Ensure that the preloader is initialized
      const rootInitTask = () => Promise.resolve()
        .then(() => {
          if (storage.getState('isPreloaderInited')) {
            return root.init();
          }

          return delayForPromise(300)
            .then(() => rootInitTask());
        });

      return rootInitTask();
    })(),
  ]))
  .catch((err) => {
    console.error('Failed to load', err);
    return Promise.reject(err);
  });
