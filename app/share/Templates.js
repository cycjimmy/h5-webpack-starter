import isString from '@cycjimmy/awesome-js-funcs/judgeBasic/isString';

export default class Templates {
  /**
   * Templates
   * @param template
   * @param selectorOrEl
   * @param data
   */
  constructor(template, selectorOrEl, data) {
    if (isString(selectorOrEl)) {
      this.element = document.querySelector(selectorOrEl);
    } else {
      this.element = selectorOrEl;
    }

    this.template = template;
    this.jsonData = data;
  }

  /**
   * load
   * @param isAddToEl
   */
  load(isAddToEl = false) {
    if (!isAddToEl) {
      //不是追加内容，先清空innerHTML
      this.element.innerHTML = '';
    }

    this.element.innerHTML += this.template(this.jsonData);
  }
};

