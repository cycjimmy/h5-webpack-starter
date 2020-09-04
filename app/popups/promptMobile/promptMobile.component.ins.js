import {Popup} from '@cycjimmy/h5-pages';
import isMobile from '@cycjimmy/awesome-js-funcs/handheld/isMobile';
import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';

import template from './promptMobile.pug'
import _style from './promptMobile.scss'
import QRCodeImg from '../../../static/images/QRCode.png';

export default new class extends Popup {
  constructor() {
    super();
    this.isMobile = false;
  };

  load() {
    if (isMobile()) {
      this.isMobile = true;
      return Promise.resolve();
    }

    this.isMobile = false;

    return Promise.resolve()
      .then(() => functionToPromise(() => {
        this.isMobile = false;
        this.popup.classList.add(_style.wrapper);
      }))
      .then(() => this.render(template({
        _style,
        QRCodeImg,
        suggest: 'Scan code for better experience.',
      })))
      .then(() => Promise.reject('not mobile device'));
  };

  getIsMobile() {
    return this.isMobile;
  };
};


