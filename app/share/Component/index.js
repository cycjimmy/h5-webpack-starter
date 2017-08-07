import Templates from '../Templates';

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
    return new Promise(resolve => {
      new Templates(pugTemplate, wrapperElement, insetParam).load(isAddToEl);

      setTimeout(() => {
        resolve();
      }, 0);
    });
  };

  load() {
    throw new Error('The method must be overridden');
  };

  eventBind() {
    throw new Error('The method must be overridden');
  };
};

