import Component from '../share/Component/index';

export default class SlideComponent extends Component {
  constructor({
                context,
                mainSwiper,
                slideIndex,
                audioComponent,
              }) {
    super({
      context,
    });
    this.mainSwiper = mainSwiper;
    this.slideIndex = slideIndex;
    this.audioComponent = audioComponent;
  };

  init({
         pugTemplate,
         wrapperElement,
         insetParam,
         isAddToEl = false,
         doSlideChangeEnd = () => {
         },
         doLeaveSlide = () => {
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
        this.swiperCommand({
          doSlideChangeEnd,
          doLeaveSlide,
        });

        return this.extraRender();
      })
  };

  paramInit() {
  };

  eventBind() {
  };

  extraRender() {
  };

  swiperCommand({
                  doSlideChangeEnd = () => {
                  },
                  doLeaveSlide = () => {
                  },
                }) {
    if (this.mainSwiper) {
      this.mainSwiper.on('slideChange', () => {
        if (this.mainSwiper.realIndex === this.slideIndex) {
          console.log('Slide' + this.slideIndex);
          doSlideChangeEnd(this.mainSwiper);
        }
        if (this.mainSwiper.previousIndex === this.slideIndex) {
          doLeaveSlide(this.mainSwiper);
        }
      });
    }
  };
};

