import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/less/public.css'

import request from './utils/request.axios'
import api from './api'

Vue.use(ElementUI);

Vue.config.productionTip = false
// 访问接口通用方法
Vue.prototype.$req = request
// 接口信息
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')