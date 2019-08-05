// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

import RdsVue from '../index';

import App from './index.vue';
import routes from './routes';

RdsVue.install(Vue, {
  selectUrl() {
    return 'https://api.jsonbin.io/b/5d48498f89ed890b24cc2d3a';
  },
  remoteSelectUrl() {
    return 'https://api.jsonbin.io/b/5d48501e77bd85336aa82139';
  },
});

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
