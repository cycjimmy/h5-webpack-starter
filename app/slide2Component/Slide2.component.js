import Templates from '../share/Templates';
import Swiper from 'swiper';

import * as slide2 from './slide2.pug';
import * as slide2Style from './slide2.scss';
import * as mainStyle from '../mainComponent/main.scss';

export default class Slide2Component {
  constructor() {
    this.context = document.querySelector('.' + mainStyle.slide2);
  }

  load() {

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
          let
            slideContainer = this.context.querySelector('.' + slide2Style.container)
          ;

          new Swiper(slideContainer, {
            nested: true,                            // 嵌套
            roundLengths : true,                     // 取整

            pagination: '.' + _style.pagination,
            paginationClickable: true,
            bulletActiveClass : _style.bulletActive,

            spaceBetween: 30,
          });

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