import Templates from '../share/Templates';

import * as slide0 from './slide0.pug';
import * as slide0Style from './slide0.scss';
import * as logoSvg from '../../static/images/myLogo.svg';

// service
import Slide0Service from './Slide0.service';

export default class Slide0Component {
  constructor(context) {
    this.context = context;
  }

  load(mainSwiper) {
    // load flow
    return new Promise(resolve => {
      new Templates(slide0, this.context, {
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
          new Slide0Service(this.context).load(mainSwiper);

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };
};

// private
let
  _style = slide0Style
;