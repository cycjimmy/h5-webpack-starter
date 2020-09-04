import isString from '@cycjimmy/awesome-js-funcs/judgeBasic/isString';
import nodeListToArray from '@cycjimmy/awesome-js-funcs/typeConversion/nodeListToArray';

export default class QueryAll {
  /**
   * QueryAll
   * @param selectorOrEls
   * @param context
   */
  constructor(selectorOrEls, context = document) {
    let elements = null;

    if (isString(selectorOrEls)) {
      elements = context.querySelectorAll(selectorOrEls);
    } else {
      elements = selectorOrEls;
    }

    this.nodeList = nodeListToArray(elements);
  };

  /**
   * event bind
   * @param eventType
   * @param fn
   * @returns {QueryAll}
   */
  on(eventType, fn) {
    const aEvents = eventType.split(' ');

    this.nodeList.forEach(el => {
      for (let event of aEvents) {
        el.addEventListener(event, fn);
      }
    });

    return this;
  };

  /**
   * addClass
   * @param className
   * @returns {QueryAll}
   */
  addClass(className) {
    this.nodeList.forEach((el) => {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    });

    return this;
  };

  /**
   * removeClass
   * @param className
   * @returns {QueryAll}
   */
  removeClass(className) {
    this.nodeList.forEach((el) => {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    });

    return this;
  };

  /**
   * hasClass
   * @param className
   * @returns {QueryAll}
   */
  hasClass(className) {
    this.nodeList.forEach((el) => {
      if (el.classList) {
        el.classList.contains(className);
      } else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }
    });

    return this;
  };

  /**
   * remove element
   */
  remove() {
    this.nodeList.forEach(el => {
      el.parentNode.removeChild(el);
    });
  };
};
