import { Popup } from '@cycjimmy/h5-pages';
import functionToPromise from '@cycjimmy/awesome-js-funcs/esm/typeConversion/functionToPromise';

import template from './popupX.pug';
import _style from './popupX.scss';

export default new class extends Popup {
  constructor() {
    super();
    this.popup.classList.add(_style.wrapper);

    this.state = {
      isButtonsActive: false,
    };
  }

  load() {
    return Promise.resolve()
      .then(() => this.render(template({
        _style,
      })))
      .then(() => functionToPromise(() => {
        this._paramInit();
        this._eventBind();
      }, 50))
      .then(() => this._fadeIn());
  }

  remove() {
    return Promise.resolve()
      .then(() => functionToPromise(() => {
        this.popup.classList.remove(_style.fadeIn);
        this.state.isButtonsActive = false;
      }, 500))
      .then(() => super.remove());
  }

  _paramInit() {
    this.box = this.popup.querySelector(`.${_style.box}`);
    this.closeBtn = this.box.querySelector(`.${_style.closeBtn}`);
  }

  _eventBind() {
    const closePopup = () => {
      if (!this.state.isButtonsActive) {
        return;
      }

      this.remove();
      this.popup.removeEventListener('click', closePopup);
    };

    this.popup.addEventListener('click', closePopup);
    this.closeBtn.addEventListener('click', closePopup);

    this.box.addEventListener('click', (e) => e.stopPropagation());
  }

  _fadeIn() {
    this.popup.classList.add(_style.fadeIn);
    setTimeout(() => {
      this.state.isButtonsActive = true;
    }, 1e3);
  }
}();
