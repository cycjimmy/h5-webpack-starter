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

  // If you want to display touchActive while moving, do not execute removeTouchActive
  if (!isMoveShowActive) {
    element.on('touchmove', removeTouchActive);
  }

  element.on('touchend', removeTouchActive);
  element.on('touchcancel', removeTouchActive);
};
