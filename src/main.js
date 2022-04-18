import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wb from './service-worker'

Vue.prototype.$workbox = wb
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
