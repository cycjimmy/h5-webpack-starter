import Templates from '../share/Templates';
import Swiper from 'swiper';

import * as main from './main.pug';
import * as mainStyle from './main.scss';

// component
import Slide1Component from '../slide1Component/Slide1.component';
import Slide2Component from '../slide2Component/Slide2.component';

export default class MainSctComponent {
  constructor() {
    this.context = document.querySelector('.main-screen');
  }

  load() {
    // load flow
    return new Promise(resolve => {
      new Templates(main, this.context, {
        _style,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {
          // Swiper
          new Swiper(this.context, {
            pagination: '.' + _style.pagination,
            paginationClickable: true,
            direction: 'vertical',
          });

          setTimeout(() => {
            resolve();
          }, 0);
        });
      })
      .then(() => {
        return Promise.all([
          new Slide1Component().load(),
          new Slide2Component().load(),
        ]);
      });
  };
};

// private
let
  _style = mainStyle
;