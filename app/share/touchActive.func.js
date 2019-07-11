import QueryAll from './QueryAll';

/**
 * addTouchActive
 */
const addTouchActive = function () {
  if (!this.classList.contains('touch-active')) {
    this.classList.add('touch-active');
  }
};

/**
 * removeTouchActive
 */
const removeTouchActive = function () {
  if (this.classList.contains('touch-active')) {
    this.classList.remove('touch-active');
  }
};

/**
 * touchActive
 * @param selectorOrEls
 * @param context
 * @param isMoveShowActive
 */
export default (selectorOrEls, context = document, isMoveShowActive = false) => {
  const element = new QueryAll(selectorOrEls, context);

  element.on('touchstart', addTouchActive);

  //如移动时要显示touchActive，则不执行removeTouchActive
  if (!isMoveShowActive) {
    element.on('touchmove', removeTouchActive);
  }

  element.on('touchend', removeTouchActive);
  element.on('touchcancel', removeTouchActive);
};

