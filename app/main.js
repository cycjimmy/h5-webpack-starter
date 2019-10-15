import FastClick from 'fastclick';
import webInitialize from './webInitialize.afunc';
import preventDefault from '@cycjimmy/awesome-js-funcs/event/preventDefault';

if (DEVELOPMENT) {
  console.log('Development Mode');
  console.log(require('@cycjimmy/awesome-js-funcs/handheld').getBrowserInfo());
}

if (PRODUCTION) {
  console.log('Production Mode');
}

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

if (!DEVELOPMENT) {
  OfflinePluginRuntime.install();
}

// contextMenu preventDefault
document.addEventListener('contextmenu', preventDefault);

// fix ios native scrolling
document.body.addEventListener('touchmove', preventDefault, {passive: false});

// web page init
document.addEventListener('DOMContentLoaded', () => {
  // bind fastClick
  if (FastClick) {
    FastClick.attach(document.body);
  }

  // web init
  webInitialize();
}, false);
