import Component from '../share/Component/index';
import MainSwiperIns from './MainSwiper.ins';

export default class SlideComponent extends Component {
  constructor({
                context,
                slideIndex,
              }) {
    super({
      context,
    });
    this.slideIndex = slideIndex;
  };

  init({
         pugTemplate,
         wrapperElement,
         insetParam,
         isAddToEl = false,
         doSlideChangeEnd = () => {
         },
       }) {
    return this.render({
      pugTemplate,
      wrapperElement,
      insetParam,
      isAddToEl,
    })
      .then(() => {
        this.paramInit();
        this.eventBind();
        this.swiperCommand(doSlideChangeEnd);
      })
  };

  paramInit() {
  };

  eventBind() {
  };

  swiperCommand(doSlideChangeEnd = () => {
  }) {
    let
      mainSwiper = new MainSwiperIns().getMainSwiper()
    ;

    if (mainSwiper) {
      mainSwiper.on('slideChangeEnd', () => {
        if (mainSwiper.realIndex === this.slideIndex) {
          console.log('Slide' + this.slideIndex);
          doSlideChangeEnd();
        }
      });
    }
  };
};
