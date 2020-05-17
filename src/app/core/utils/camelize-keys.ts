const camelize = (str: string) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isArray = (array: any) => Array.isArray(array);

const isObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]';

export const camelizeKeys = (o: any) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[camelize(k)] = camelizeKeys(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return camelizeKeys(i);
    });
  }

  return o;
};
