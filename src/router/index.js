import Vue from 'vue'
import VueRouter from 'vue-router'

import user from '@/views/user/user'
import userList from '@/views/user/user-list'
Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
    {
        path: '/user',
        redirect: '/user/userlist',
        name: '用户管理',
        component: user,
        children: [
            {
                path: 'userlist',
                name: '用户列表',
                component: userList
            },
            {
                path: 'userAdd',
                name: '用户新增',
                component: () => import('@/views/user/user-add')
            }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
