import {createApp} from "./app";

export default (context)=> {
    return new Promise((resolve,reject)=> {
        const {app, router, store} = createApp();
        if(context.userInfo) {
            let {code, username, account, phone} = context.userInfo;
            if (code) {
                store.commit('updateAuthorizedCode', code);
            }
            store.commit('setUsername', username);
            ;
            store.commit('setAccount', account);
            store.commit('setPhone', phone);
            store.commit('toggleLoginState', true);
        }
        // set server-side router's location
        router.push(context.url)
        router.onReady(()=> {
            let matchedComponents = router.getMatchedComponents();
            if(!matchedComponents.length){
                return reject({code: 404})
            }
            console.log(matchedComponents.length)
            Promise.all(matchedComponents.map(component=> {
                const asyncData = component.asyncData;
                if(asyncData){
                    return asyncData({store, route: router.currentRoute});
                }
            })).then(()=>{
                context.state = store.state;
                resolve(app)
            }).catch(err=> {
                console.log(err)
            })
        },reject)
    })
}
