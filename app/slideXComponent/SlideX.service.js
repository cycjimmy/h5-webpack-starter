import * as slideXStyle from './slideX.scss';

export default class Slide0Service {
  constructor({
                context,
                slideIndex,
              }) {
    this.context = context;
    this.slideIndex = slideIndex;
  };

  load(mainSwiper) {
    this.swiperCommand(mainSwiper);
    this.eventBind();
  };

  swiperCommand(mainSwiper) {
    mainSwiper.on('slideChangeEnd', () => {
      if (mainSwiper.realIndex === this.slideIndex) {
        console.log('slide' + this.slideIndex);
      }
    });
  };

  eventBind() {
  };
};

// private
let
  _style = slideXStyle
;
