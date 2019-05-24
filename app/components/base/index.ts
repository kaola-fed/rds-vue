import { VueConstructor } from 'vue';
import KSDivider from './KSDivider/index.vue';
import KSText from './KSText/index.vue';
import KSValidation from './KSValidation/index.vue';


const components = {
    KSDivider,
    KSText,
    KSValidation,
};

export default (Vue: VueConstructor) => {
  Object.values(components).forEach((component) => {
    Vue.component(component.name, component);
  });

  /* eslint no-param-reassign: 0 */
  // Vue.prototype.$preview = KlImagePreview;
};
