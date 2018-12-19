// constructor
import CreateInstance from 'awesome-js-funcs/designPattern/CreateInstance';

export default (Component) => {
  const _instance = new CreateInstance();

  return (param = {}) => {
    if (_instance()) {
      return _instance();
    }
    const component = new Component(param);
    _instance(component);
    return component;
  };
};