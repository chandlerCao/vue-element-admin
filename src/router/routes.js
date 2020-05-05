export default [{
    path: 'home',
    name: '首页',
    meta: {
        icon: 'el-icon-s-home'
    },
    component: () => import('@/views/admin/home')
}, {
    path: 'system',
    redirect: 'system/user',
    name: '系统管理',
    meta: {
        icon: 'el-icon-s-tools'
    },
    component: () => import('@/views/system/system'),
    children: [
        {
            path: 'user',
            name: '用户管理',
            component: () => import('@/views/system/user')
        },
        {
            path: 'role',
            name: '角色管理',
            component: () => import('@/views/system/role')
        },
        {
            path: 'menu',
            name: '菜单管理',
            component: () => import('@/views/system/menu')
        }
    ]
}]