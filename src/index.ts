import ElementUI from 'element-ui';
import 'element-kaola/index.scss';
import './styles/index.scss';

import BaseComponents from './components/base';
import CompositeComponents from './components/composite';

import authMixin from './mixins/auth';
import listMixin from './mixins/list';
import selectMixin from './mixins/select';
import validateMixin from './mixins/validate';

import * as Utils from './utils';

import Directives from './directives';

import Filters from './filters';

export default {
  install: (Vue, options?: any) => {
    // 按需引入
    Vue.use(ElementUI);
    Vue.use(BaseComponents);
    Vue.use(CompositeComponents);
    Vue.use(Filters);
    Vue.use(Directives);
    Object.defineProperty(Vue, 'ksvue', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: options,
    });
  },
};

// 懒加载
export const utils = Utils;
export const AuthMixin = authMixin;
export const ListMixin = listMixin;
export const SelectMixin = selectMixin;
export const ValidateMixin = validateMixin;
