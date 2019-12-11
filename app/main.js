import FastClick from 'fastclick';
import webInitialize from './webInitialize.afunc';

// web page init
document.addEventListener('DOMContentLoaded', () => {
  // bind fastClick
  if (FastClick) {
    FastClick.attach(document.body);
  }

  // web init
  webInitialize();
}, false);
