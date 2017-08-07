import SlideComponent from '../Slide.component';

import * as slideX from './slideX.pug';
import * as slideXStyle from './slideX.scss';


export default class SlideXComponent extends SlideComponent {
  constructor({
                context,
                slideIndex,
              }) {
    super({
      context,
      slideIndex,
    });
  };

  load() {
    return this.init({
      pugTemplate: slideX,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    });
  };


};

// private
let
  _style = slideXStyle
;