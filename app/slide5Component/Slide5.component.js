import Templates from '../share/Templates';

import * as slide5 from './slide5.pug';
import * as slide5Style from './slide5.scss';
import * as mainStyle from '../mainComponent/main.scss';
import * as logoSvg from '../../static/images/myLogo.svg';

// service
import Slide1Service from './Slide5.service';

export default class Slide5Component {
  constructor() {
    this.context = document.querySelector('.' + mainStyle.slide5);
  }

  load() {
    // load flow
    return new Promise(resolve => {
      new Templates(slide5, this.context, {
        _style,
        logoSvg,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {
          // load service
          new Slide1Service(this.context).load();

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };
};

// private
let
  _style = slide5Style
;
