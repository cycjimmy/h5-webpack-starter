import SlideComponent from '../Slide.component';

import * as slide from './slideX.pug';
import * as _style from './slideX.scss';

export default class SlideXComponent extends SlideComponent {
  constructor({
                context,
                slideIndex,
                audioComponent,
              }) {
    super({
      context,
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
};
