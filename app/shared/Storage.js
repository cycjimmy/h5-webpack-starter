import isString from '@cycjimmy/awesome-js-funcs/esm/judgeBasic/isString';

export default class {
  /**
   * _set
   * @param key
   * @param paramsObj
   * @private
   */
  _set(key, paramsObj = {}) {
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in paramsObj) {
      if (
        Object.prototype.hasOwnProperty.call(paramsObj, propName)
        && Object.prototype.hasOwnProperty.call(this[key], propName)
      ) {
        this[key][propName] = paramsObj[propName];
      }
    }

    return this;
  }

  /**
   * _get
   * @param key
   * @param propNames
   * @returns {{}}
   * @private
   */
  _get(key, propNames) {
    if (isString(propNames)) {
      return this[key][propNames];
    }

    if (Array.isArray(propNames)) {
      const result = {};
      propNames.forEach((propName) => {
        if (Object.prototype.hasOwnProperty.call(this[key], propName)) {
          result[propName] = this[key][propName];
        }
      });
      return result;
    }

    return this[key];
  }
}
