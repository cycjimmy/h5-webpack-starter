import Templates from '../share/Templates';

import * as slide2 from './slide2.pug';
import * as slide2Style from './slide2.scss';

// service
import Slide2Service from './Slide2.service';

export default class Slide2Component {
  constructor(context) {
    this.context = context;
  }

  load(mainSwiper) {
    // load flow
    return new Promise(resolve => {
      let
        _style = slide2Style
      ;

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
          new Slide2Service(this.context).load(mainSwiper);

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };
};