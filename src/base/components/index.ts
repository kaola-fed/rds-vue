import KlDivider from './kl.divider/index.vue';
import KlImagePreview from './kl.image.preview/index.vue';
import KlMultiSelect from './kl.multi.select/index.vue';
import KlSearch from './kl.search/index.vue';
import KlSelect from './kl.select/index.vue';
import KlText from './kl.text/index.vue';
import KlTransfer from './kl.transfer/index.vue';
import KlTreeSelect from './kl.tree.select/index.vue';
import KlUpload from './kl.upload/index.vue';
import KlValidation from './kl.validation/index.vue';

import {VueConstructor} from "vue";

const components = {
  KlDivider,
  KlImagePreview,
  KlMultiSelect,
  KlSearch,
  KlSelect,
  KlText,
  KlTransfer,
  KlTreeSelect,
  KlUpload,
  KlValidation,
};

export default (Vue: VueConstructor) => {
  for (let component of Object.values(components)) {
    Vue.component(component.name, component);
  }

  Vue.prototype.$preview = KlImagePreview;
};
