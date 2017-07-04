/**
 * Created by cyc on 2016/11/23.
 * 一些自用方法
 */

/**
 * 单词首字母大写
 * @param str
 */
const firstUpperCase = str => {
  return str.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => {
    return $1.toUpperCase() + $2.toLowerCase();
  });
};

/**
 * 中线命名转变成驼峰命名法
 * @param str
 */
const strToCamel = str => {
  let re = /-(\w)/g;
  return str.replace(re, ($0, $1) => $1.toUpperCase());
};

/**
 * 判断是否字符串
 * @param str
 * @returns {boolean}
 */
const isString = (str) => {
  return (typeof str === 'string') && str.constructor === String;
};

/**
 * 判断是否object
 * @param o
 * @returns {boolean}
 */
const isObject = o => Object.prototype.toString.call(o) === '[object Object]';

/**
 * 取得url相对路径根目录
 * @returns {string|*}
 */
const getUrlRelativeDir = () => {
  let
    relativeDir,
    url = document.location.toString(),
    arrUrl = url.split("//"),
    start = arrUrl[1].indexOf("/"),
    final = arrUrl[1].lastIndexOf("/");

  relativeDir = arrUrl[1].substring(start, final);

  return relativeDir;
};

/**
 * 模拟事件触发
 * @param el 元素
 * @param type 事件类型
 * @param bubbles 是否冒泡
 * @param cancelable 是否可取消
 */
const dispatch = (el, type = 'click', bubbles = true, cancelable = false) => {
  try {
    let ev = document.createEvent('Event');
    ev.initEvent(type, bubbles, cancelable);
    el.dispatchEvent(ev);
  } catch (e) {
    console.error(e);
  }
};

/**
 * 兄弟节点过滤器（主要用来选取同组中的激活对象）
 * @param el
 * @param className
 * @returns {*}
 */
const siblingFilter = (el, className = 'active') => {
  return Array.prototype.filter.call(el.parentNode.children, child => {
    return child.classList.contains(className);
  });
};

/**
 * 单例模式构造函数(设计模式)
 * @returns {function(*=)}
 * @constructor
 */
const CreateInstance = () => {
  let instance;
  return (newInstance) => {
    if (newInstance) {
      instance = newInstance;
    }
    return instance;
  }
};

/**
 * 遍历对象属性方法兼容
 * @param obj
 * @returns {Iterator.<*>|*}
 */
const entries = (obj) => {
  let replaceFunc = (obj) => {
    let arr = [];
    for (let key of Object.keys(obj)) {
      arr.push([key, obj[key]]);
    }
    return arr;
  };

  if (Object.entries) {
    return Object.entries(obj);
  } else {
    return replaceFunc(obj);
  }
};

export {
  firstUpperCase,
  strToCamel,
  isString,
  isObject,
  getUrlRelativeDir,
  dispatch,
  siblingFilter,
  CreateInstance,
  entries,
};