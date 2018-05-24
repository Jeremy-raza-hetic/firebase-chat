import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Auth from './views/auth/Auth.vue'
import Profile from './views/Profile.vue'
import Room from './components/rooms/Room.vue'

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
            component: Home,
            children: [
                {
                    path: 'profile',
                    component: Profile
                }
            ]
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
