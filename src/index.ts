import {
  Aside,
  Button,
  Card,
  Container,
  Col,
  Checkbox,
  Dialog,
  Dropdown,
  DropdownMenu,
  Form,
  FormItem,
  Icon,
  Input,
  Main,
  Message,
  Option,
  Progress,
  Row,
  Radio,
  RadioGroup,
  Select,
  Step,
  Steps,
  Tag,
  Table,
  TableColumn,
  Tooltip,
  Tree,
} from 'element-ui';
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
    Vue.use(Aside);
    Vue.use(Button);
    Vue.use(Card);
    Vue.use(Container);
    Vue.use(Col);
    Vue.use(Checkbox);
    Vue.use(Dialog);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Icon);
    Vue.use(Input);
    Vue.use(Main);
    Vue.use(Option);
    Vue.use(Progress);
    Vue.use(Row);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Select);
    Vue.use(Step);
    Vue.use(Steps);
    Vue.use(Tag);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Tooltip);
    Vue.use(Tree);
    Vue.prototype.$message = Message;
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
