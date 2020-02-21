import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: () => import('../views/Profile')
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('../views/Users')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login')
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import('../views/Registration')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
