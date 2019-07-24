export function _uniq(arr) {
  const result: any = [];
  arr.forEach((item: any) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });
  return result;
}

export function _findByObj(arr, obj) {
  const keys: any = Object.keys(obj);
  return arr.find(item => keys
    .every(key => JSON.stringify(item[key]) === JSON.stringify(obj[key])));
}
