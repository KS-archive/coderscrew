/* eslint-disable no-sequences */
export default (obj: { [k: string]: any }, arr: string[]) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc: { [k: string]: any }, key: string) => ((acc[key] = obj[key]), acc), {});
