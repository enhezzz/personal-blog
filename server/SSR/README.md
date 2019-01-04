### 什么是服务器端渲染(SSR)？
    Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

    服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。

### 为什么使用服务器端渲染(SSR)？
与传统 SPA（Single-Page Application - 单页应用程序）相比，服务器端渲染(SSR)的优势主要在于：

更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。

请注意，截至目前，Google 和 Bing 可以很好对同步 JavaScript 应用程序进行索引。在这里，同步是关键。如果你的应用程序初始展示 loading 菊花图，然后通过 Ajax 获取内容，抓取工具并不会等待异步完成后再行抓取页面内容。也就是说，如果 SEO 对你的站点至关重要，而你的页面又是异步获取内容，则你可能需要服务器端渲染(SSR)解决此问题。

更快的内容到达时间(time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以你的用户将会更快速地看到完整渲染的页面。通常可以产生更好的用户体验，并且对于那些「内容到达时间(time-to-content)与转化率直接相关」的应用程序而言，服务器端渲染(SSR)至关重要。

使用服务器端渲染(SSR)时还需要有一些权衡之处：

开发条件所限。浏览器特定的代码，只能在某些生命周期钩子函数(lifecycle hook)中使用；一些外部扩展库(external library)可能需要特殊处理，才能在服务器渲染应用程序中运行。

涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序(SPA)不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。

更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源(CPU-intensive - CPU 密集)，因此如果你预料在高流量环境(high traffic)下使用，请准备相应的服务器负载，并明智地采用缓存策略。

在对你的应用程序使用服务器端渲染(SSR)之前，你应该问的第一个问题是，是否真的需要它。这主要取决于内容到达时间(time-to-content)对应用程序的重要程度。例如，如果你正在构建一个内部仪表盘，初始加载时的额外几百毫秒并不重要，这种情况下去使用服务器端渲染(SSR)将是一个小题大作之举。然而，内容到达时间(time-to-content)要求是绝对关键的指标，在这种情况下，服务器端渲染(SSR)可以帮助你实现最佳的初始加载性能。

### 服务器端渲染 vs 预渲染(SSR vs Prerendering)
如果你调研服务器端渲染(SSR)只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要预渲染。无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时(build time)简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。

如果你使用 webpack，你可以使用 prerender-spa-plugin 轻松地添加预渲染。它已经被 Vue 应用程序广泛测试 - 事实上，作者是 Vue 核心团队的成员。


>   后面的教程我将通过本项目实力阐述如何进行seo构建，将不再以官网demo进行实例
### 编写通用代码

在服务器端渲染过程中需要注意以下三项：
1.  服务器上的数据响应
在纯客户端应用程序(client-only app)中，每个用户会在他们各自的浏览器中使用新的应用程序实例。对于服务器端渲染，我们也希望如此：每个请求应该都是全新的、独立的应用程序实例，以便不会有交叉请求造成的状态污染(cross-request state pollution)。

因为实际的渲染过程需要确定性，所以我们也将在服务器上“预取”数据("pre-fetching" data) - 这意味着在我们开始渲染时，我们的应用程序就已经解析完成其状态。也就是说，将数据进行响应式的过程在服务器上是多余的，所以默认情况下禁用。禁用响应式数据，还可以避免将「数据」转换为「响应式对象」的性能开销。
2.  组件生命周期钩子函数
由于没有动态更新，所有的生命周期钩子函数中，只有 beforeCreate 和 created 会在服务器端渲染(SSR)过程中被调用。这就是说任何其他生命周期钩子函数中的代码（例如 beforeMount 或 mounted），只会在客户端执行。

此外还需要注意的是，你应该避免在 beforeCreate 和 created 生命周期时产生全局副作用的代码，例如在其中使用 setInterval 设置 timer。在纯客户端(client-side only)的代码中，我们可以设置一个 timer，然后在 beforeDestroy 或 destroyed 生命周期时将其销毁。但是，由于在 SSR 期间并不会调用销毁钩子函数，所以 timer 将永远保留下来。为了避免这种情况，请将副作用代码移动到 beforeMount 或 mounted 生命周期中。（客户端实现）
3.  访问特定平台(Platform-Specific) API
通用代码不可接受特定平台的 API，因此如果你的代码中，直接使用了像 window 或 document，这种仅浏览器可用的全局变量，则会在 Node.js 中执行时抛出错误，反之也是如此。

对于共享于服务器和客户端，但用于不同平台 API 的任务(task)，建议将平台特定实现包含在通用 API 中，或者使用为你执行此操作的 library。例如，axios 是一个 HTTP 客户端，可以向服务器和客户端都暴露相同的 API。

对于仅浏览器可用的 API，通常方式是，在「纯客户端(client-only)」的生命周期钩子函数中惰性访问(lazily access)它们。

请注意，考虑到如果第三方 library 不是以上面的通用用法编写，则将其集成到服务器渲染的应用程序中，可能会很棘手。你可能要通过模拟(mock)一些全局变量来使其正常运行，但这只是 hack 的做法，并且可能会干扰到其他 library 的环境检测代码。


###   源码结构
*   app.js
    为避免状态污染，所以我们使用createRouter创建router，使用createStore创建store,使用createApp创建应用实例。
*   client-entry.js
    router.onReady(),用来提前解析路由配置中的异步组件，才能正确地调用组件中可能存在的路由钩子。然后在挂载到相应的节点上。
*   server-entry.js
    首先是将router导航到指定的route状态，通过router.push(url),然后解析完异步组件后，在router.onReady的回调中获取匹配的components实例，然后调用实例的静态异步方法更新store状态，所有匹配组件的异步方法都resolved后，此时store的状态就是当前路由ssr的最终状态，然后把当前的store的state应用与context的state（用于注入到客户端的window.__INITIAL_STATE__,以同步客户端的状态）。如果没有匹配的组件，可以reject一个状态，比如{code: 404},供后续处理。

### 路由和代码分割
*   创建路由生成器，为了避免路由状态污染

````
//  详细配置可以查看官网路由配置页面
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      // ...
    ]
  })
}
````

接下来重要的一点每当请求更新时更新在服务器端中的路由状态
````
//  在server-entry.js中
router.push(context.url)    //更新路由状态
````

*   代码分割

这个的具体可以查看官方路由页面，主要用来减少浏览器在初始渲染中下载的资源体积。

note:  2.5+ 的版本中，得益于核心算法的升级，异步组件现在可以在应用中的任何地方使用。

### 数据预取和状态

*   数据预取存储容器


这里就是通过vuex来实现状态管理
````
createRouter(store) //通过函数来返回状态实例对象，避免状态污染
````

*   服务器端数据预取

````

//  server-entry.js

import {createApp} from "./app";
export default (context)=> {
    return new Promise((resolve,reject)=> {
        const {app, router, store} = createApp();
        if(context.userInfo) {  //后端传入的用户信息，用来初始化用户信息状态
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
        router.onReady(()=> {   //待所有异步组件都解析完成之后
            let matchedComponents = router.getMatchedComponents();  //  当前路由匹配的所有组件
            if(!matchedComponents.length){
                return reject({code: 404})  //  没有匹配到返回一种404状态供后面处理
            }
            console.log(matchedComponents.length)
            Promise.all(matchedComponents.map(component=> {
                const asyncData = component.asyncData;  //  获取并调用组件的异步方法获取数据，传入路由和状态容器来获取参数和处理结果
                if(asyncData){
                    return asyncData({store, route: router.currentRoute});
                }
            })).then(()=>{
                context.state = store.state;    //  将当前路由最终状态添加到 server-renderer context中，用以激活客户端状态
                resolve(app)
            }).catch(err=> {
                console.log(err)
            })
        },reject)
    })
    
// entry-client.js

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)  // 激活客户端状态
}
}

````

*   客户端数据预取

在客户端，处理数据预取有两种不同方式：
1.  在路由导航之前解析数据
2.  匹配要渲染的视图后，再获取数据

我这里用的是第二种，差别在用户体验上，用哪种自己斟酌

此策略将客户端数据预取逻辑，放在视图组件的 beforeMount 函数中。当路由导航被触发时，可以立即切换视图，
因此应用程序具有更快的响应速度。然而，传入视图在渲染时不会有完整的可用数据。因此，对于使用此策略的每个视图组件，都需要具有条件加载状态。

````
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
````  

###   构建配置
我们假设你已经知道，如何为纯客户端(client-only)项目配置 webpack。服务器端渲染(SSR)项目的配置大体上与纯客户端项目类似，但是我们建议将配置分为三个文件：base, client 和 server。基本配置(base config)包含在两个环境共享的配置，例如，输出路径(output path)，别名(alias)和 loader。服务器配置(server config)和客户端配置(client config)，可以通过使用 webpack-merge 来简单地扩展基本配置

*   服务器配置(Server Config)
    entry指向server-entry.js,target设置为'node'（会在编译 Vue 组件时告知 `vue-loader` 输送面向服务器代码(server-oriented code)。）,devtool设置为'source-map'（方便调试），
    output.libraryTarget设置为'commonjs2'（此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)）
*   客户端配置(Client Config)


##   Question???
(持续更新)

