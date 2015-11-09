import React from 'react';
import enhanceInstances from './enhance-instance.js';
import {cond, extendDeep, Map} from './utils.js';

const reactribute = (transforms, {deep} = {}) => {

  const matchers = reactribute.matchers.concat(reactribute.defaultMatcher);
  const getTransformMatcher = cond(...matchers);

  transforms = transforms.map(t => {
    t.matcher = getTransformMatcher(t.matcher);
    return t;
  });

  const decorator = enhanceInstances(element => {
    let ret = {};

    if (deep && typeof element.type === 'function') {
        element.type = decorator(element.type);
    }

    for (let i = 0, len = transforms.length; i < len; i++) {
      const {matcher, fn} = transforms[i];
      if (matcher === true || matcher(element)) {
          const result = fn(element);
          if (!result) {
            return result;
          }
          extendDeep(ret, result);
      }
    }
    return ret;
  });

  return decorator;

};

reactribute.matchers = [
  [x => typeof x === 'function', x => x],
  [x => x instanceof RegExp, x => ({type, props}) =>
      x.test(type) || Object.keys(props).some(k => x.test(k))]
];

reactribute.defaultMatcher =
  x => ({type, key, props}) =>
    type === x || key === x || x in props;

export default reactribute;
