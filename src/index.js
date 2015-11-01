import enhanceInstances from './enhance-instance.js';
import {cond} from './utils.js';

const getTransformMatcher = cond(
  [x => typeof x === 'function', x => x],
  [x => x instanceof RegExp, x => ({type, props}) =>
      x.test(type) || Object.keys(props).some(k => x.test(k))],
  x => ({type, props}) =>
    type === x || x in props
);

const reactribute = transforms => {

  transforms = transforms.map(t => {
    t.matcher = getTransformMatcher(t.matcher);
    return t;
  });

  return enhanceInstances(element => {
    for (let i = 0, len = transforms.length; i < len; i++) {
      const {matcher, fn} = transforms[i];
    if (matcher(element)) {
        element = fn(element);
      }
    }

    return element;

  });

};

export default reactribute;