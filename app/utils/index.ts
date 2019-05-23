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
  
  const queryAppend = (url: string, query: obj = {}) => {
    let resultUrl = url;
    Object.keys(query).forEach((key) => {
        if (query.hasOwnProperty(key) && (query[key] || query[key] === 0 || query[key] === false)) {
            resultUrl += `&${key}=${query[key]}`;
        }
    });
  
    resultUrl = resultUrl.replace(/&/, '?');
    return resultUrl;
  };
  
    export default {
        filterEmpty,
        blankToComma,
        queryAppend,
    };
  