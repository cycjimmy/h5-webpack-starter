/**
 * Created by cyc on 2016/11/2.
 */

import QueryAll from './QueryAll';

// 参数：
// 选择器或元素，上下文，移动时是否要显示touchActive

export default function (selectorOrEls, context = document) {

  let element = new QueryAll(selectorOrEls, context);

  element.on('click', function () {
    addTouchActive(this);
    setTimeout(() => {
      removeTouchActive(this)
    }, 200);
  });
};


//增加效果
let addTouchActive = (el) => {
  if (!el.classList.contains('touch-active')) {
    el.classList.add('touch-active');
  }
};

//删除效果
let removeTouchActive = el => {
  if (el.classList.contains('touch-active')) {
    el.classList.remove('touch-active');
  }
};
