// constructor
import {
  CreateInstance,
} from '../share/awesome.func';

let
  _instance = new CreateInstance()
;

export default class mainSwiperIns {
  constructor() {
    if (_instance()) {
      return _instance();
    }

    this.mainSwiper = null;

    _instance(this);
  };

  setMainSwiper(mainSwiper) {
    this.mainSwiper = mainSwiper;
  };

  getMainSwiper() {
    return this.mainSwiper;
  }
};