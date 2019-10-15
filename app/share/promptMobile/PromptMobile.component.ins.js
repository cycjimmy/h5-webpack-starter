// constructor
import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';

import isMobile from '@cycjimmy/awesome-js-funcs/handheld/isMobile';

import promptMobile from './promptMobile.pug'
import _style from './promptMobile.scss'

// image
import QRCodeImg from '../../../static/images/QRCode.png';

const _createInstance = new CreateInstance();    // 构造函数实例

export default class PromptMobileComponentIns {
  constructor() {
    if (_createInstance()) {
      return _createInstance();
    }
    this.isMobile = false;
    this.wrapper = document.createElement('div');

    _createInstance(this);
  };

  load() {
    return new Promise((resolve, reject) => {
      if (isMobile()) {
        this.isMobile = true;
        resolve();
      } else {
        this.isMobile = false;

        this.wrapper.classList.add(_style.wrapper);
        this.wrapper.innerHTML = promptMobile({
          _style,
          QRCodeImg,
          suggest: 'Scan code for better experience.'
        });

        document.body.appendChild(this.wrapper);

        reject('not mobile device');
      }
    });
  };

  getIsMobile() {
    return this.isMobile;
  };
};

