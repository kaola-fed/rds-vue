import { VueConstructor } from 'vue';
import KSDetailHeader from './KSDetailHeader/index';


const components = {
    KSDetailHeader
};

export default (Vue: VueConstructor) => {
  Object.values(components).forEach((component) => {
    Vue.component(component.name, component);
  });

  /* eslint no-param-reassign: 0 */
  // Vue.prototype.$preview = KlImagePreview;
};
