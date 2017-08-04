import Templates from '../share/Templates';

import * as slide4 from './slide4.pug';
import * as slide4Style from './slide4.scss';
import * as logoSvg from '../../static/images/myLogo.svg';

// service
import Slide1Service from './Slide4.service';

export default class Slide4Component {
  constructor({
                context,
                slideIndex,
              }) {
    this.context = context;
    this.slideIndex = slideIndex;
  };

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
          new Slide1Service({
            context: this.context,
            slideIndex: this.slideIndex,
          }).load(mainSwiper);

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
