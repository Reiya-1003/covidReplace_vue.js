import Vue from 'vue'
import App from './App.vue'
import router from './roter'
import store from './store/index.js'
import VuePapaParse from "vue-papa-parse";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { sync } from 'vuex-router-sync'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.filter('numberFormat', function(num){
  return num.toLocaleString()
})
Vue.use(VuePapaParse);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
sync(store, router)

new Vue({
  router,
  store,
  
  render: h => h(App),
  
}).$mount('#app')
