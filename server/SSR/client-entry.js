import {createApp} from './app'

const {app, router, store} = createApp();

router.onReady(()=>{
    store.replaceState(window.__INITIAL_STATE__)
    app.$mount("#app");
})