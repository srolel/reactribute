import React from 'react';
import {cond, extend, resolveElementParams} from './utils.js';

const applyFnToAllElements = (inst, fn) => {
  if (!React.isValidElement(inst)) {
    return inst;
  }

  const result = fn({type: inst.type, key: inst.key, ref: inst.ref, props: inst.props, children: inst.props.children});


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
  const {render} = Component.prototype;
  const newComponent = class extends Component {};
  newComponent.prototype.render = fn(render);
  return newComponent;
};

const enhanceReactPureComponent = (Component, fn) => fn(Component);

const decorateRender = fn => oldRender => function(...args) {
  const instance = oldRender.apply(this, args);
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
