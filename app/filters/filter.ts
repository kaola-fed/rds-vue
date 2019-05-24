import dayjs from 'dayjs';
import { VueConstructor } from 'vue';

const date = (value: any, format:string = 'YYYY-MM-DD') => {
  if (!value && value !== 0) {
    return '-';
  }

  const obj = dayjs(value);
  return obj.format(format);
};

const datetime = (value: any, format:string = 'YYYY-MM-DD HH:mm:ss') => date(value, format);

type currencyType = {
  currency?: string,
  minimumSignificantDigits?: number,
  maximumSignificantDigits?: number,
  locales?: any
};
const currency = (value: number, currencyOption: currencyType = {
  currency: 'CNY', minimumSignificantDigits: 2, maximumSignificantDigits: 2, locales: 'zh-CN',
}) => {
  if (!value && value !== 0) {
    return '-';
  }

  const { locales, ...others } = currencyOption;
  const formatter = new Intl.NumberFormat(locales, {
    style: 'currency',
    ...others,
  });
  return formatter.format(value);
};

type percentType = {
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  locales?: any
};
const percent = (value: number, percentOption: percentType = { minimumFractionDigits: 2, maximumFractionDigits: 2, locales: 'zh-CN' }) => {
  if (!value && value !== 0) {
    return '-';
  }

  const { locales, ...others } = percentOption;
  const formatter = new Intl.NumberFormat(locales, {
    style: 'percent',
    ...others,
  });
  return formatter.format(value);
};

const placeholder = (value: any, emptyText: string = '-') => {
  if (!value && value !== 0) {
    return emptyText;
  }
  return value;
};

const trim = (value: string) => value.replace(/[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+/g, '');

export {
  date,
  datetime,
  currency,
  percent,
  placeholder,
  trim,
};
