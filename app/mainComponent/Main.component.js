import Templates from '../share/Templates';
import Swiper from 'swiper';

import * as main from './main.pug';
import * as mainStyle from './main.scss';

// component
import Slide1Component from '../slide1Component/Slide1.component';

export default class MainSctComponent {
  constructor() {
    this.context = document.querySelector('.main-screen');
  }

  load() {
    let
      eContext = this.context
    ;

    // load flow
    return new Promise(resolve => {
      let
        _style = mainStyle
      ;

      new Templates(main, eContext, {
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
            pagination: '.swiper-pagination',
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
        ]);
      });
  };
};