import Templates from '../share/Templates';

import * as slide3 from './slide3.pug';
import * as slide3Style from './slide3.scss';
import * as mainStyle from '../mainComponent/main.scss';

// service
import Slide3Service from './Slide3.service';

export default class Slide3Component {
  constructor() {
    this.context = document.querySelector('.' + mainStyle.slide3);
  }

  load() {
    // load flow
    return new Promise(resolve => {
      let
        _style = slide3Style
      ;

      new Templates(slide3, this.context, {
        _style,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {
          // load service
          new Slide3Service(this.context).load();

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };
};