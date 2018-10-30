import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/blog',
      component: () => import(/* webpackChunkName: "blog" */ './views/blog/BlogList.vue'),
      children: [
        {
          path: '',
          redirect: 'Web%20Development'
        },
        {
          path: ':theme?',
          name: 'blogTheme',
          component: () => import(/* webpackChunkName: "blog" */ './views/blog/BlogTheme.vue')
        },
        {
          path: ':theme/:id',
          name: 'blogDetail',
          component: () => import(/* webpackChunkName: "blog" */ './views/blog/BlogDetail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import(/* webpackChunkName: "error" */ './views/administration/Error.vue')
     },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/administration/Index.vue'),
      beforeEnter: (to, from, next) => {
          if (to.matched.some(record => record.meta.requiresAuth)) {
              if(Store.state.code == 1) next()
              else next({path: '/error'});
          }
      },
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: 'post',
        },
        {
          path: 'post',
          name: 'post',
          component: () => import(/* webpackChunkName: "admin" */ './views/administration/Post.vue')
        }
      ]
    },
      {
          path: '/search',
          name: 'search',
          component: () => import(/* webpackChunkName: "search" */ './views/Search.vue')
      }
  ]
})
