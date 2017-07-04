/**
 * Created by cyc on 2017/3/17.
 */

// constructor
import {CreateInstance} from './awesome.func';

let Instance = () => {
  let
    _createInstance = new CreateInstance()  // 构造函数实例
    ;

  return class {
    /**
     * 单例构造器
     * @param addAttrHook 添加属性挂钩
     * @returns {*}
     */
    constructor(addAttrHook = () => {
    }) {
      // 存在instance，直接返回该instance
      if (_createInstance()) {
        console.log('存在单例');
        return _createInstance();
      }

      console.log('初始化单例');

      // 按自己需求实例化
      addAttrHook();

      // 创建instance
      _createInstance(this);
    };
  };
};

export default Instance;