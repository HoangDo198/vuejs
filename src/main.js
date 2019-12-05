import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { ValidationProvider } from 'vee-validate';
import VueMeta from 'vue-meta';
import Axios from 'axios';
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
 

Vue.use(VueMeta);
Vue.use(Chartkick.use(Chart))
Vue.component('ValidationProvider', ValidationProvider);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
