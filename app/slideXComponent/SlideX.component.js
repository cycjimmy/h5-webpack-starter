import Templates from '../share/Templates';

import * as slideX from './slideX.pug';
import * as slideXStyle from './slideX.scss';

// service
import SlideXService from './SlideX.service';

export default class SlideXComponent {
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
      new Templates(slideX, this.context, {
        _style,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {
          // load service
          new SlideXService({
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
  _style = slideXStyle
;