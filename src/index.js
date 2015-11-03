import enhanceInstances from './enhance-instance.js';
import {cond} from './utils.js';

const reactribute = transforms => {

  const matchers = reactribute.matchers.concat(reactribute.defaultMatcher);
  const getTransformMatcher = cond(...matchers);

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

reactribute.matchers = [
  [x => typeof x === 'function', x => x],
  [x => x instanceof RegExp, x => ({type, props}) =>
      x.test(type) || Object.keys(props).some(k => x.test(k))]
];

reactribute.defaultMatcher =
  x => ({type, key, props}) =>
    type === x || key === x || x in props;

export default reactribute;
