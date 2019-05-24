import {
  date, datetime, currency, percent, placeholder, trim,
} from './filter';

export default {
  install(Vue: VueConstructor) {
    Vue.filter('date', date);
    Vue.filter('datetime', datetime);

    Vue.filter('currency', currency);
    Vue.filter('percent', percent);
    Vue.filter('placeholder', placeholder);
    Vue.filter('trim', trim);
  },
};
