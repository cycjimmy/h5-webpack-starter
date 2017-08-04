import Templates from '../share/Templates';

import * as slide1 from './slide1.pug';
import * as slide1Style from './slide1.scss';

// service
import Slide1Service from './Slide1.service';

export default class Slide1Component {
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
      new Templates(slide1, this.context, {
        _style,
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
  _style = slide1Style
;