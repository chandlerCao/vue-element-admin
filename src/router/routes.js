export default [
    {
        path: 'home',
        name: '首页',
        meta: {
            icon: 'el-icon-s-home'
        },
        component: () => import('@/views/admin/home')
    },
    {
        hide: true,
        path: 'refresh',
        name: '刷新路由',
        component: () => import('@/views/admin/refresh')
    },
    // 文章管理
    {
        path: 'article',
        name: '文章管理',
        redirect: 'article/list',
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
                component: () => import('@/views/article/article-list/article-list')
            },
            {
                path: 'dustbin',
                name: '回收站',
                component: () => import('@/views/article/article-list/article-dustbin')
            }
        ]
    },
    // 标签管理
    {
        path: 'tag',
        name: '标签管理',
        redirect: 'tag/list',
        meta: {
            icon: 'el-icon-price-tag'
        },
        component: () => import('@/views/tag/tag'),
        children: [
            {
                path: 'add',
                name: '新建标签',
                component: () => import('@/views/tag/tag-form/tag-add')
            },
            {
                path: 'edit/:tid',
                name: '编辑标签',
                hide: true,
                component: () => import('@/views/tag/tag-form/tag-edit')
            },
            {
                path: 'list',
                name: '标签列表',
                component: () => import('@/views/tag/tag-list')
            }
        ]
    },
    // 评论管理
    {
        path: 'comment',
        name: '评论管理',
        redirect: 'comment/clist',
        meta: {
            icon: 'el-icon-chat-dot-square'
        },
        component: () => import('@/views/comment/comment'),
        children: [
            {
                path: 'clist',
                name: '评论列表',
                component: () => import('@/views/comment/comment-list'),
            },
            {
                path: 'rlist',
                name: '回复列表',
                component: () => import('@/views/comment/reply-list')
            },
        ]
    },
    // 留言管理
    {
        path: 'message',
        name: '留言管理',
        redirect: 'message/mlist',
        meta: {
            icon: 'el-icon-chat-dot-round'
        },
        component: () => import('@/views/message/message'),
        children: [
            {
                path: 'mlist',
                name: '留言列表',
                component: () => import('@/views/message/message-list'),
            },
            {
                path: 'mrlist',
                name: '留言回复列表',
                component: () => import('@/views/message/message-reply-list')
            },
        ]
    },
    // 用户管理
    {
        path: 'user/list',
        name: '用户管理',
        meta: {
            icon: 'el-icon-user'
        },
        component: () => import('@/views/user/user-list'),
        children: [
            {
                hide: true,
                path: 'edit/:uid',
                name: '用户编辑',
                component: () => import('@/views/user/user-edit')
            }
        ]
    }
]