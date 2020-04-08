import QueryAll from './QueryAll';

/**
 * addTouchActive
 */
const addTouchActive = (el) => {
  if (!el.classList.contains('touch-active')) {
    el.classList.add('touch-active');
  }
};

/**
 * removeTouchActive
 */
const removeTouchActive = el => {
  if (el.classList.contains('touch-active')) {
    el.classList.remove('touch-active');
  }
};

/**
 * touchActiveMockClick
 * @param selectorOrEls
 * @param context
 */
export default (selectorOrEls, context = document) => {
  const element = new QueryAll(selectorOrEls, context);

  element.on('click', function () {
    addTouchActive(this);
    setTimeout(() => {
      removeTouchActive(this)
    }, 200);
  });
};

