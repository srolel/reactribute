import React from 'react';
import {cond, extend} from './utils.js';

const resolveElementParams = (originalInstance, transformationResult) => {
  let {type, props, children} = transformationResult;
  props = props ? extend(originalInstance.props, props) : originalInstance.props;
  children = children || (props && props.children);
  type = type || originalInstance.type;

  return {type, props, children};
};

const applyFnToAllElements = (inst, fn) => {

  if (!React.isValidElement(inst)) {
    return inst;
  }

  const result = fn({type: inst.type, props: inst.props, children: inst.props.children});

  if (result === false || typeof result === 'undefined') {
    return inst;
  }

  if (result === null) {
    return null;
  }

  let {type, props, children} = resolveElementParams(inst, result);

  const resolveChildren = cond([
      x => Array.isArray(x),
      x => React.Children.map(x, c => applyFnToAllElements(c, fn))
    ], [
      x => x,
      x => applyFnToAllElements(x, fn)
    ],
    x => x);

  children = resolveChildren(children);
  inst = React.createElement(type, props, children);
  return inst;

};

const enhanceReactClassComponent = (Component, fn) => {
  const descriptor = Object.getOwnPropertyDescriptor(Component.prototype, 'render');
  Object.defineProperty(Component.prototype, 'render', extend(descriptor, {value: fn(descriptor.render)}));
  return Component;
};

const enhanceReactPureComponent = (Component, fn) => fn(Component);

const decorateRender = fn => oldRender => () => {
  const instance = oldRender.call(this);
  const decorated = applyFnToAllElements(instance, fn);
  return decorated;
};

const enhanceInstances = fn => Component => {
  const decoratedRender = decorateRender(fn);
  const enhancer = Component.prototype.hasOwnProperty('render')
    ? enhanceReactClassComponent
    : enhanceReactPureComponent;

  return enhancer(Component, decoratedRender);
};

export default enhanceInstances;
