import Templates from '../Templates';
import functionToPromise from '@cycjimmy/awesome-js-funcs/typeConversion/functionToPromise';

export default class Component {
  constructor({
                context = null,
              }) {
    if (context) {
      this.context = context;
    }
  };

  /**
   * render
   * @param pugTemplate
   * @param wrapperElement
   * @param insetParam
   * @param isAddToEl
   * @returns {Promise}
   */
  render({
           pugTemplate,
           wrapperElement,
           insetParam,
           isAddToEl = false,
         }) {
    return functionToPromise(() => new Templates(pugTemplate, wrapperElement, insetParam).load(isAddToEl));
  };

  load() {
    throw new Error('The method must be overridden');
  };

  eventBind() {
    throw new Error('The method must be overridden');
  };
};

