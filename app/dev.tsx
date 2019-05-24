// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import KsText from './components/base/KSText/index.vue';
import Filters from './filters';
import * as Formatter from './filters/filter';
import Test from './test.vue';

Vue.use(Filters);
Vue.prototype.$formatter = Formatter;


/* eslint-disable no-new */
new Vue({
  components: {
    KsText,
    Test,
  },
  render(h) {
    return (<div><ks-text content="这是一段文本这是一段文本这是一段文本这是一段文本" /><test /></div>);
  },
}).$mount('#app');
