import Templates from '../share/Templates';
import Swiper from 'swiper';

import * as slide1 from './slide1.pug';
import * as slide1Style from './slide1.scss';

export default class Slide1Component {
  constructor(context) {
    this.context = context;
  }

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
          let
            slideContainer = this.context.querySelector('.' + _style.container)
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
  _style = slide1Style
;