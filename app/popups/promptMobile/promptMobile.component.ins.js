import { h5Pages, Popup } from '@cycjimmy/h5-pages';
import isMobile from '@cycjimmy/awesome-js-funcs/esm/handheld/isMobile';
import functionToPromise from '@cycjimmy/awesome-js-funcs/esm/typeConversion/functionToPromise';
import debounce from '@cycjimmy/awesome-js-funcs/esm/event/debounce';

import QRCodeImg from '@static/images/QRCode.png';
import template from './promptMobile.pug';
import _style from './promptMobile.scss';
import settingConfig from '@/setting.config.json';

/**
 * createQRCodeAndTipDesktop
 * @returns {Promise<unknown>}
 */
const createQRCodeAndTipDesktop = () => Promise.resolve()
  .then(() => functionToPromise(() => {
    const QRCodeEl = document.createElement('div');
    QRCodeEl.classList.add(_style.QRCodeDesktop);
    h5Pages.root.appendChild(QRCodeEl);

    const tipEl = document.createElement('div');
    tipEl.classList.add(_style.tipDesktop);
    h5Pages.root.appendChild(tipEl);
  }));

export default new class extends Popup {
  constructor() {
    super();
    this.isMobile = false;
  }

  load() {
    return Promise.resolve()
      .then(() => createQRCodeAndTipDesktop())
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

        h5Pages.root.classList.add('desktop');

        if (settingConfig.needSupportDesktop) {
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
