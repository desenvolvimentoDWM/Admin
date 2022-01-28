import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import Users from '@/components/Users/Users'
import Tasks from '@/components/Tasks/Tasks'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'users',
        path: '/users',
        component: Users
    },
    {
        name: 'tasks',
        path: '/tasks',
        component: Tasks
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
