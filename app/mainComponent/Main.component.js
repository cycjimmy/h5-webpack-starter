import Templates from '../share/Templates';
import Swiper from 'swiper';

import * as main from './main.pug';
import * as mainStyle from './main.scss';

// component
import Slide1Component from '../slide1Component/Slide1.component';
import Slide2Component from '../slide2Component/Slide2.component';
import Slide3Component from '../slide3Component/Slide3.component';
import Slide4Component from '../slide4Component/Slide4.component';

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
            bulletActiveClass: _style.bulletActive,

            direction: 'vertical',
            mousewheelControl: true,
            wrapperClass: _style.wrapper,

            hashnav: true,
            hashnavWatchState: true,
            replaceState: true,
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
          new Slide3Component().load(),
          new Slide4Component().load(),
        ]);
      });
  };
};

// private
let
  _style = mainStyle
;