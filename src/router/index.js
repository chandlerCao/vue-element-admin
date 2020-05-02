import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

import admin from '@/views/admin/admin'

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
            path: '/admin',
            alias: '/',
            redirect: '/admin/home',
            name: '后台',
            component: admin,
            children: routes
        }
    ]
})

export default router
