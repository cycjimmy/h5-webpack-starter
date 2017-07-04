import {isString} from './awesome.func';

export default class Templates {

  //参数：模板名，选择器，data
  constructor(template, selectorOrEl, data) {

    if (isString(selectorOrEl)) {
      this.element = document.querySelector(selectorOrEl);
    } else {
      this.element = selectorOrEl;
    }

    this.template = template;
    this.jsonData = data;
  }

  //参数：是否为追加内容
  load(isAddToEl = false) {
    if (!isAddToEl) {
      //不是追加内容，先清空innerHTML
      this.element.innerHTML = '';
    }

    this.element.innerHTML += this.template(this.jsonData);
  }
};

