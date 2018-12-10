import Vue from 'vue';
import App from '../../src/App.vue'
// import Router from 'vue-router'
// import vuex from 'vuex'
import createRouter from '../../src/router'
import {createStore} from "../../src/store";
import NProgress from 'nprogress'
import axios from 'axios'

//全局mixin配置
Vue.mixin({
    beforeMount() {
        const {asyncData} = this.$options;
        if(asyncData) {
            NProgress.start()
            asyncData({
                store: this.$store,
                route: this.$route
            }).then(()=> {
                NProgress.done()
            })
        }
    },
    beforeRouteUpdate(to, from, next) {
        const {asyncData} = this.$options;
        if(asyncData){
            NProgress.start()
            asyncData({
                store: this.$store,
                route: to
            }).then(()=>{
                NProgress.done()
                next()
            }).catch(()=> next())
        }else{
            next()
        }
    }
})


// Vue.use(Router)
export function createApp(){
    const store = createStore()
    const router = createRouter(store)

    let app =  new Vue({
        router,
        store,
        render: h=> h(App)
    })
    return {app, router, store}
}