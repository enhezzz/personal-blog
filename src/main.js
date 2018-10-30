import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import VueWangeditor from 'vue-wangeditor-simple'
import VoerroTagsInput from '@voerro/vue-tagsinput';
Vue.component('tags-input', VoerroTagsInput);
Vue.use(VueWangeditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
