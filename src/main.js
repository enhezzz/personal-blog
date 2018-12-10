import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

import {createStore} from './store'
const store = createStore()
const router = createRouter(store)
Vue.config.productionTip = false
import VueWangeditor from 'vue-wangeditor-simple'
import VoerroTagsInput from '@voerro/vue-tagsinput';
Vue.component('tags-input', VoerroTagsInput);
Vue.use(VueWangeditor)



if(window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
