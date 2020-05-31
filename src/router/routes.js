export default [{
    path: 'home',
    name: '首页',
    meta: {
        icon: 'el-icon-s-home'
    },
    component: () => import('@/views/admin/home')
}, {
    path: 'article',
    redirect: 'article/list',
    name: '文章管理',
    meta: {
        icon: 'el-icon-notebook-2'
    },
    component: () => import('@/views/article/article'),
    children: [
        {
            path: 'add',
            name: '新建文章',
            component: () => import('@/views/article/article-form/article-add')
        },
        {
            path: 'edit/:aid',
            name: '编辑文章',
            hide: true,
            component: () => import('@/views/article/article-form/article-edit')
        },
        {
            path: 'list',
            name: '文章列表',
            component: () => import('@/views/article/article-list')
        },
        {
            path: 'dustbin',
            name: '回收站',
            component: () => import('@/views/article/article-dustbin')
        }
    ]
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
            component: () => import('@/views/system/user'),
        },
        {
            path: 'role',
            name: '角色管理',
            component: () => import('@/views/system/role')
        },
        {
            hide: true,
            path: 'menu',
            name: '菜单管理',
            component: () => import('@/views/system/menu')
        }
    ]
}]