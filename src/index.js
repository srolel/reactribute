import React from 'react';

const applyFnToAllElements = (inst, fn) => {

  if (!inst) {
    return;
  }

  inst = fn(inst);

  if (inst.props && inst.props.children) {
     return React.cloneElement(inst, {},
        React.Children.map(
          inst.props.children,
          c => applyFnToAllElements(c, fn)));
  }

return inst;

};

const replaceComponentMethod = (Component, fn) => {
  const {value: oldRender, ...descriptor} = Object.getOwnPropertyDescriptor(Component.prototype, 'render');
  Object.defineProperty(Component, 'render', {...descriptor, value: fn(oldRender)});
  return Component;
}

const decorateRender = (oldRender) => {
  const instance = oldRender.call(this);
  applyFnToAllElements(instance, Component => {
    console.log(Component);
    return Component
  })
};

const decorator = Component => {
  replaceComponentMethod(Component, decorateRender);
  return Component;

};

export default decorator
