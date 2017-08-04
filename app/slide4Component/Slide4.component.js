import Templates from '../share/Templates';

import * as slide4 from './slide4.pug';
import * as slide4Style from './slide4.scss';
import * as logoSvg from '../../static/images/myLogo.svg';

// service
import Slide1Service from './Slide4.service';

export default class Slide4Component {
  constructor(context) {
    this.context = context;
  }

  load(mainSwiper) {
    // load flow
    return new Promise(resolve => {
      new Templates(slide4, this.context, {
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
          new Slide1Service(this.context).load(mainSwiper);

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };
};

// private
let
  _style = slide4Style
;
