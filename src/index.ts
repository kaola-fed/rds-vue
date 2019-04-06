import AuthMixin from '@/base/mixins/auth';
import ListMixin from '@/base/mixins/list';
import SelectMixin from '@/base/mixins/select';
import ValidateMixin from '@/base/mixins/validate';

import Filters from '@/base/filters';
import Directives from '@/base/directives';
import Components from '@/base/components';

import { JSONAPI, FORMAPI, FORMDATAAPI } from '@/base/request';
import Utils from '@/base/utils';

import '@/style/index.scss';

export default {
  AuthMixin,
  ListMixin,
  SelectMixin,
  ValidateMixin,

  Filters,
  Directives,
  Components,

  JSONAPI,
  FORMAPI,
  FORMDATAAPI,
  Utils,
};
