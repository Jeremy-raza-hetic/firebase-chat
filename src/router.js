import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Auth from './views/auth/Auth.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      redirect: '/auth/login'
    },
    {
      path: '/auth/:route',
      name: 'auth',
      component: Auth
    }
  ]
})


