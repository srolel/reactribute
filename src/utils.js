export const maybeExecute = (fn, ...args) =>
  typeof fn === 'function'
    ? fn(...args)
    : fn;

export const cond = (...tests) => {

  const _default = Array.isArray(tests[tests.length - 1])
    ? null
    : tests.pop();

  return arg => {

    for (let i = 0, len = tests.length; i < len; i++) {
      const test = tests[i];
      if (test[0](arg)) {
        return maybeExecute(test[1], arg);
      }
    }

    if (_default) {
      return maybeExecute(_default, arg);
    }

  };
};

const isObject = x => typeof x === 'object';

export const resolveElementParams = (originalInstance, transformationResult) => {

  let {type, props, children} = transformationResult;
  props = props ? {...originalInstance.props, ...props} : originalInstance.props;

  if (type && type !== originalInstance.type && type.defaultProps) {
    props = {...type.defaultProps, ...props};
  }

  children = children || (props && props.children);
  type = type || originalInstance.type;

  const key = props.key || transformationResult.key || originalInstance.key || undefined;
  const ref = props.ref || transformationResult.ref || originalInstance.ref || undefined;

  return {type, props, children, key, ref};
};

export const flatten = arr => Array.prototype.concat.apply([], arr);
