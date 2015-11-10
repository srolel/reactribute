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
      ret[k] = obj1[k];
    }
  }

  return ret;
};

const isObject = x => typeof x === 'object';

export const extendDeep = (...objs) => {
  let ret = objs.shift(), firstRun = true;
  while (objs.length > 0) {
    const obj = objs.pop();
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        if (isObject(obj[k]) && isObject(ret[k]) && !obj[k].$$typeof && !ret[k].$$typeof) {
          ret[k] = extendDeep({}, ret[k], obj[k]);
        } else if (firstRun || !(k in ret)) {
          ret[k] = obj[k];
        }
      }
      firstRun = false;
    }
  }
  return ret;
};

export const resolveElementParams = (originalInstance, transformationResult) => {

  let {type, props, children} = transformationResult;
  props = props ? extend(originalInstance.props, props) : originalInstance.props;
  children = children || (props && props.children);
  type = type || originalInstance.type;

  const key = props.key || transformationResult.key || originalInstance.key;
  const ref = props.ref || transformationResult.ref || originalInstance.ref;

  props = extend(props, {key, ref});
  return {type, props, children, key, ref};
};

// export class Map {
//     constructor() {
//         this.keys = [];
//         this.indices = {};
//         this.values = {};
//     }

//     set(key, val) {
//         const index = this.keys.push(key);
//         this.indices[key] = index;
//         this.values[index] = val;
//     }

//     get(key) {
//       return this.values[key];
//     }

//     delete(key) {
//       this.keys.splice(this.indices[key], 1);
//       delete this.indices[key];
//       delete this.values[key];
//     }
// }