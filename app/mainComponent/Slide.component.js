import Component from '../share/Component/index';
import MainSwiperIns from './MainSwiper.ins';

export default class SlideComponent extends Component {
  constructor({
                context,
                slideIndex,
                audioComponent,
              }) {
    super({
      context,
    });
    this.slideIndex = slideIndex;
    this.audioComponent = audioComponent;
  };

  init({
         pugTemplate,
         wrapperElement,
         insetParam,
         isAddToEl = false,
         doSlideChangeEnd = (mainSwiper) => {
         },
         doLeaveSlide = (mainSwiper)=>{},
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
        this.swiperCommand({
          doSlideChangeEnd,
          doLeaveSlide,
        });
      })
  };

  paramInit() {
  };

  eventBind() {
  };

  swiperCommand({
                  doSlideChangeEnd = (mainSwiper) => {
                  },
                  doLeaveSlide = (mainSwiper) => {
                  },
                }) {
    let
      mainSwiper = new MainSwiperIns().getMainSwiper()
    ;

    if (mainSwiper) {
      mainSwiper.on('slideChangeEnd', () => {
        if (mainSwiper.realIndex === this.slideIndex) {
          console.log('Slide' + this.slideIndex);
          doSlideChangeEnd(mainSwiper);
        }
        if (mainSwiper.previousIndex === this.slideIndex) {
          doLeaveSlide(mainSwiper);
        }

      });
    }
  };
};
