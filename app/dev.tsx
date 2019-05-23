// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import KsText from './components/base/KSText/index.vue';

/* eslint-disable no-new */
new Vue({
  components: {
    KsText,
  },
  render(h) {
    return (<ks-text content="这是一段文本这是一段文本这是一段文本这是一段文本"></ks-text>);
  },
}).$mount('#app');
