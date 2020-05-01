import Vue from 'vue'
import VueRouter from 'vue-router'

import admin from '@/views/admin'
Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
    {
        path: '/admin',
        alias: '/',
        redirect: '/admin/home',
        name: '后台',
        component: admin,
        children: [{
            path: 'home',
            name: '首页',
            component: () => import('@/views/home')
        }, {
            path: 'system',
            redirect: 'system/user',
            name: '系统管理',
            component: () => import('@/views/system/system'),
            children: [
                {
                    path: 'user',
                    name: '用户管理',
                    component: () => import('@/views/system/user')
                }
            ]
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
