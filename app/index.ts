import AuthMixin from './mixins/auth';
import ListMixin from './mixins/list';
import SelectMixin from './mixins/select';
import ValidateMixin from './mixins/validate';

import Filters from './filters';
import Directives from './directives';
import BaseComponents from './components/base';

import { JSONAPI, FORMAPI, FORMDATAAPI } from './request';
import Utils from './utils';

import '@/style/index.scss';

export default {
  AuthMixin,
  ListMixin,
  SelectMixin,
  ValidateMixin,

  Filters,
  Directives,
  BaseComponents,

  JSONAPI,
  FORMAPI,
  FORMDATAAPI,
  Utils,
};
