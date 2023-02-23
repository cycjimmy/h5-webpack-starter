import Storage from '../shared/Storage';

export default new class extends Storage {
  constructor() {
    super();

    // state
    this.state = {
      isPreloaderInited: false,
      isInited: false,
    };
  }

  /**
   * getState
   * @param propNames
   * @return {*}
   */
  getState(propNames) {
    return this._get('state', propNames);
  }

  /**
   * setState
   * @param paramsObj
   */
  setState(paramsObj = {}) {
    return this._set('state', paramsObj);
  }
}();
