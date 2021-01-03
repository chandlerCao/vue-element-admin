import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/public.css'
import '@/assets/css/reset-el.css'

Vue.use(ElementUI);

// mavonEditor
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(mavonEditor);


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

import request from '@/ajax/request.axios'
import api from '@/ajax/api'
// 访问接口通用方法
Vue.prototype.$req = request
// 接口信息
Vue.prototype.$api = api

// 自定义指令
import directive from '@/directive'

for (const key in directive) {
  Vue.directive(key, directive[key])
}

// 数组方法
import '@/utils/Array'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')