import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/public.css'

import request from './utils/request.axios'
import api from './api'

import 'default-passive-events'

Vue.use(ElementUI);


import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',
  false,
  /comp-(.+)\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(
      fileName.split('/').pop().replace(/\.\w+$/, '')
    )
  )
  Vue.component(
    componentName, componentConfig.default || componentConfig
  )
})

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