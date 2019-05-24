import moment from 'moment';
import { VueConstructor } from 'vue';

const date = (value: number, format:string = 'YYYY-MM-DD') => {
  if (!value && value !== 0) {
    return '-';
  }

  const date = new Date(+value);
  const obj = moment(date);
  return obj.format(format);
};

const datetime = (value: number, format:string = 'YYYY-MM-DD HH:mm:ss') => date(value, format);

type currencyType = {
  currency?: string,
  minimumSignificantDigits?: number,
  maximumSignificantDigits?: number,
  locales?: any
};
const currency = (value: number, {
  currency = 'CNY', minimumSignificantDigits = 2, maximumSignificantDigits = 2, locales = 'zh-CN',
}: currencyType) => {
  if (!value && value !== 0) {
    return '-';
  }

  const formatter = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    minimumSignificantDigits,
    maximumSignificantDigits,
  });
  return formatter.format(value);
};

type percentType = {
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  locales?: any
};
const percent = (value: number, { minimumFractionDigits = 2, maximumFractionDigits = 2, locales = 'zh-CN' }: percentType) => {
  if (!value && value !== 0) {
    return '-';
  }

  const formatter = new Intl.NumberFormat(locales, {
    style: 'currency',
    minimumFractionDigits,
    maximumFractionDigits,
  });
  return formatter.format(value);
};

const placeholder = (value: any, emptyText: string = '-') => {
  if (!value && value !== 0) {
    return emptyText;
  }
  return value;
};

export default {
  install(Vue: VueConstructor) {
    Vue.filter('date', date);
    Vue.filter('datetime', datetime);

    Vue.filter('currency', currency);
    Vue.filter('percent', percent);
    Vue.filter('placeholder', placeholder);
  },
};
