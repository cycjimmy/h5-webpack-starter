import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';
import isMobile from '@cycjimmy/awesome-js-funcs/handheld/isMobile';
import h5Pages from '@cycjimmy/h5-pages';

import template from './promptMobile.pug'
import _style from './promptMobile.scss'
import QRCodeImg from '../../../static/images/QRCode.png';

const instance = new CreateInstance();

export default class PromptMobileComponentIns {
  constructor() {
    if (instance()) {
      return instance();
    }
    this.isMobile = false;
    this.wrapper = document.createElement('div');

    instance(this);
  };

  load() {
    return new Promise((resolve, reject) => {
      if (isMobile()) {
        this.isMobile = true;
        resolve();
      } else {
        this.isMobile = false;

        this.wrapper.classList.add(_style.wrapper);
        this.wrapper.innerHTML = template({
          _style,
          QRCodeImg,
          suggest: 'Scan code for better experience.',
        });

        h5Pages.root.appendChild(this.wrapper);

        reject('not mobile device');
      }
    });
  };

  getIsMobile() {
    return this.isMobile;
  };
};

