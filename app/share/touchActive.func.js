/**
 * Created by cyc on 2016/11/2.
 *
 */

import QueryAll from './QueryAll';

// 参数：
// 选择器或元素，上下文，移动时是否要显示touchActive

export default function (selectorOrEls, context = document, isMoveShowActive = false) {

  let element = new QueryAll(selectorOrEls, context);

  element.on('touchstart', addTouchActive);

  //如移动时要显示touchActive，则不执行removeTouchActive
  if (!isMoveShowActive) {
    element.on('touchmove', removeTouchActive);
  }

  element.on('touchend', removeTouchActive);
  element.on('touchcancel', removeTouchActive);
};


//增加效果
let addTouchActive = function () {

  if (!this.classList.contains('touch-active')) {
    //console.log("touchstart");
    this.classList.add('touch-active');
  }
};

//删除效果
let removeTouchActive = function () {
  if (this.classList.contains('touch-active')) {
    //console.log("endtouch");
    this.classList.remove('touch-active');
  }
};
