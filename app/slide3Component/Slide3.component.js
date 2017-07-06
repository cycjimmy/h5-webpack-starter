import Templates from '../share/Templates';

import * as slide1 from './slide3.pug';
import * as slide1Style from './slide3.scss';
import * as mainStyle from '../mainComponent/main.scss';
import * as logoSvg from '../../static/images/myLogo.svg';



// service
import Slide3Service from './Slide3.service';

export default class Slide1Component {
  constructor() {
    this.context = document.querySelector('.' + mainStyle.slide3);
  }

  load() {
    // load flow
    return new Promise(resolve => {
      let
        _style = slide1Style
      ;

      new Templates(slide1, this.context, {
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
          new Slide3Service(this.context).load();

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };
};