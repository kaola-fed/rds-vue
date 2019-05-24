import qs from 'qs';

/* 过滤undefined, null等无效值，可选过滤'' */
const filterEmpty = (data: any) => {
  if (data) {
    if (data instanceof Array) {
      return data;
    }
    const rst: any = {};
    Object.keys(data).forEach((key) => {
      if (key === '_allowSpace') {
        return;
      }
      if (!data[key] && data[key] !== 0 && data[key] !== false) {
        if (data._allowSpace && data[key] === '') {
          rst[key] = data[key];
        }
        return;
      }
      rst[key] = data[key];
    });
    return rst;
  }
};

const blankToComma = (value: any) => {
  if (!value && value !== 0) {
    return '';
  }

  return value.trim().replace(/[ \n\t]+/g, ',')
    .replace(/[,，]+/g, ',').replace(/^[,，]/g, '')
    .replace(/[,，]$/g, '');
};


const param2query = (url: string, query: obj = {}) => {
  let resultUrl = url;
  resultUrl += `?${qs.stringify(query)}`;
  return resultUrl;
};

const query2param = (url: string) => {
  const arr = url.split('?');
  const param = arr.length ? arr[1] : '';
  return qs.parse(param);
};

// 深度clone
const clone = (value: any) => {
  const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  const cloned: obj = {};
  switch (type) {
    case 'object':
      Object.keys(value).forEach((i: any) => {
        cloned[i] = clone(value[i]);
      });
      return cloned;
    case 'array':
      return value.map(clone);
    default:
      return value;
  }
};

const download = (url: string, params: obj, isImage = true) => {
  let resultUrl = url;
  if (!resultUrl) {
    return;
  }

  if (params) {
    resultUrl += '?';
    Object.keys(params).forEach((param: any) => {
      if (params.hasOwnProperty(param)) {
        if (Array.isArray(params[param])) {
          /* eslint-disable no-loop-func */
          params[param].forEach((el: any) => {
            resultUrl += `${param}[]=${el}&`;
          });
          /* eslint-enable no-loop-func */
        } else if (params[param] !== undefined) {
          resultUrl += `${param}=${params[param]}&`;
        }
      }
    });
  }

  if (isImage) {
    const a: any = document.createElement('a');
    a.href = resultUrl;
    a.download = true;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.open(resultUrl);
  }
};

const groupBy = (data: obj[], key: string) => {
  const groups:obj = {};
  const list: any[] = [];
  data.forEach((item: any) => {
    if (!groups[item[key]]) {
      groups[item[key]] = [];
    }
    groups[item[key]].push(item);
  });
  Object.keys(groups).forEach((group) => {
    const obj: obj = {
      list: groups[group],
    };
    obj[key] = group;
    list.push(obj);
  });
  return list;
};

const getNameByIdDeep = () => {
  return '';
};

export default {
  filterEmpty,
  blankToComma,
  param2query,
  query2param,
  clone,
  download,
  groupBy,
  getNameByIdDeep,
};
