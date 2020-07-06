import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

import login from '@/views/login/login'
import admin from '@/views/admin'
import register from '@/views/register/register'

Vue.use(VueRouter)

// 解决导航重复添加引发的报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            alias: '/login',
            name: '登陆',
            component: login
        },
        {
            path: '/admin',
            redirect: '/admin/home',
            name: '后台',
            component: admin,
            children: routes
        },
        {
            path: '/register',
            name: '注册',
            component: register
        },
        {
            path: '*',
            component: () => import('@/views/404')
        }
    ]
})

export default router
