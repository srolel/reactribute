import React from 'react';
import {resolveElementParams, flatten} from './utils.js';

const applyFnToAllElements = (inst, fn) => {
  if (!React.isValidElement(inst)) {
    return inst;
  }

  const result = fn({
    type: inst.type,
    key: inst.key,
    ref: inst.ref,
    props: inst.props,
    children: inst.props.children
  });


  if (result === false || typeof result === 'undefined') {
    return inst;
  }

  if (result === null) {
    return null;
  }

  let {type, props, children, key, ref} = resolveElementParams(inst, result);

  // https://github.com/facebook/react/issues/5519
  key = key === null ? undefined : key;

  if (Array.isArray(children)) {
    props.children = flatten(children).map(c => applyFnToAllElements(c, fn));
  } else if (children) {
    props.children = applyFnToAllElements(children, fn);
  }

  return {
    $$typeof: inst.$$typeof,
    type,
    key,
    ref,
    props,
    _owner: inst._owner
  };
};

const enhanceReactClassComponent = (Component, fn) => {
  const {render} = Component.prototype;
  const newComponent = class extends Component {};
  newComponent.displayName = Component.displayName || Component.name;
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
