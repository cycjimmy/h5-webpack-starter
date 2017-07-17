import Templates from '../share/Templates';

import * as slide4 from './slide4.pug';
import * as slide4Style from './slide4.scss';
import * as mainStyle from '../mainComponent/main.scss';

// service
import Slide4Service from './Slide4.service';

export default class Slide4Component {
  constructor() {
    this.context = document.querySelector('.' + mainStyle.slide4);
  }

  load() {
    // load flow
    return new Promise(resolve => {
      let
        _style = slide4Style
      ;

      new Templates(slide4, this.context, {
        _style,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {
          // load service
          new Slide4Service(this.context).load();

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };
};