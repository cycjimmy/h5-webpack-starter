// ECMA-262, Edition 5, 15.4.4.19
//  http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    let T, A, k;

    if (this === null) {
      throw new TypeError(" this is null or not defined");
    }
    let O = Object(this);
    let len = O.length >>> 0;
    if (Object.prototype.toString.call(callback) !== "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }
    if (thisArg) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
      let kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}