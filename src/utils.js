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

export const extend = (obj1, obj2) => {
  const ret = {};

  for (let k in obj2) {
    if (obj2.hasOwnProperty(k)) {
      ret[k] = obj2[k];
    }
  }

  for (let k in obj1) {
    if (!(k in ret) && obj1.hasOwnProperty(k)) {
      ret[k] = obj2[k];
    }
  }

  return ret;
};
