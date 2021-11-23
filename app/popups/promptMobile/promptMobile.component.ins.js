import { h5Pages, Popup } from '@cycjimmy/h5-pages';
import isMobile from '@cycjimmy/awesome-js-funcs/esm/handheld/isMobile';
import functionToPromise from '@cycjimmy/awesome-js-funcs/esm/typeConversion/functionToPromise';
import debounce from '@cycjimmy/awesome-js-funcs/esm/event/debounce';

import template from './promptMobile.pug';
import _style from './promptMobile.scss';
import QRCodeImg from '../../../static/images/QRCode.png';
import { needSupportDesktop } from '../../setting.config.json';

/**
 * createQRCodeDesktop
 * @returns {Promise<unknown>}
 */
const createQRCodeDesktop = () => Promise.resolve()
  .then(() => functionToPromise(() => {
    const QRCodeEl = document.createElement('div');
    QRCodeEl.classList.add(_style.QRCodeDesktop);
    h5Pages.root.appendChild(QRCodeEl);
  }));

export default new class extends Popup {
  constructor() {
    super();
    this.isMobile = false;
  }

  load() {
    return Promise.resolve()
      .then(() => createQRCodeDesktop())
      .then(() => this._render())
      .then(() => this._eventBind());
  }

  getIsMobile() {
    return this.isMobile;
  }

  _render() {
    return Promise.resolve()
      .then(() => functionToPromise(() => {
        this.isMobile = isMobile();
      }))
      .then(() => {
        if (this.isMobile) {
          h5Pages.root.classList.remove('desktop');
          return Promise.resolve();
        }

        if (needSupportDesktop) {
          h5Pages.root.classList.add('desktop');
          return Promise.resolve();
        }

        return Promise.resolve()
          .then(() => functionToPromise(() => {
            this.popup.classList.add(_style.wrapper);
          }))
          .then(() => this.render(template({
            _style,
            QRCodeImg,
            suggest: 'Scan code for better experience.',
          })))
          .then(() => Promise.reject(new Error('not mobile device')));
      });
  }

  _eventBind() {
    window.addEventListener(
      'resize',
      () => debounce(() => this._render(), 100)(),
    );
  }
}();
