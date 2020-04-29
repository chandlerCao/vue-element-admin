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
            path: 'user',
            redirect: 'user/userlist',
            name: '用户管理',
            component: () => import('@/views/user/user'),
            children: [
                {
                    path: 'userlist',
                    name: '用户列表',
                    component: () => import('@/views/user/user-list')
                },
                {
                    path: 'userAdd',
                    name: '用户新增',
                    component: () => import('@/views/user/user-add')
                }]
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
