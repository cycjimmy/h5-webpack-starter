import Templates from '../share/Templates';

import * as slide2 from './slide2.pug';
import * as slide2Style from './slide2.scss';

// service
import Slide2Service from './Slide2.service';

export default class Slide2Component {
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
      new Templates(slide2, this.context, {
        _style,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {
          // load service
          new Slide2Service({
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
  _style = slide2Style
;
