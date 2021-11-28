const shallowEqual = (obj1, obj2) => {
  const obj1_keys = Object.keys(obj1);
  const obj2_keys = Object.keys(obj2);

  if (obj1_keys.length !== obj2_keys.length) {
    return false;
  }

  for (const key of obj1_keys) {
    if (!(key in obj2)) {
      return false;
    }

    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

const deepEqual = (obj1, obj2) => {
  const obj1_keys = Object.keys(obj1);
  const obj2_keys = Object.keys(obj2);

  if (obj1_keys.length !== obj2_keys.length) {
    return false;
  }

  for (const key of obj1_keys) {
    if (!(key in obj2)) {
      return false;
    }

    const obj1_val = obj1[key];
    const obj2_val = obj2[key];
    const areObjects = isObject(obj1_val) && isObject(obj2_val);

    if (
      (areObjects && !deepEqual(obj1_val, obj2_val)) ||
      (!areObjects && obj1_val !== obj2_val)
    ) {
      return false;
    }
  }

  return true;
};

const isObject = (object) => {
  return object != null && typeof object === "object";
};

const interfaceEqual = (obj1, obj2, options = {}) => {
  const obj1_keys = Object.keys(obj1);
  const obj2_keys = Object.keys(obj2);

  if (obj1_keys.length !== obj2_keys.length) {
    return false;
  }

  for (const key of obj1_keys) {
    if (!(key in obj2)) {
      return false;
    }

    if (Object.keys(options).length === 0) {
      if (typeof obj1[key] !== typeof obj2[key]) {
        return false;
      }
    } else {
      if ("checkOnDate" in options && options.checkOnDate[key] != undefined) {
        if (new Date(obj1[key]) == "Invalid Date") {
          return false;
        }
      }

      if (typeof obj1[key] !== typeof obj2[key]) {
        return false;
      }
    }
  }

  return true;
};

module.exports = {
  shallowEqual,
  deepEqual,
  isObject,
  interfaceEqual,
};
