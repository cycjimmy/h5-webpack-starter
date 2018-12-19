import SlideComponent from '../Slide.component';
import instanceComponent from '../instanceComponent';

import slide from './slideX.pug';
import _style from './slideX.scss';

const _instance = instanceComponent(class extends SlideComponent {
  constructor({
                context,
                mainSwiper,
                slideIndex,
                audioComponent,
              }) {
    super({
      context,
      mainSwiper,
      slideIndex,
      audioComponent,
    });
  };

  load() {
    return this.init({
      pugTemplate: slide,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    });
  };
});

export default (param) => _instance(param);

