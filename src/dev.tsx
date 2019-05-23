// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import KlText from '@/base/components/kl.text/index.vue';

/* eslint-disable no-new */
new Vue({
  components: {
    KlText,
  },
  render(h) {
    return (<kl-text content="这是一段文本这是一段文本这是一段文本这是一段文本"></kl-text>);
  },
}).$mount('#app');
