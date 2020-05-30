export default {
    // 获取文章列表
    getArticleList: {
        method: 'post',
        url: 'article/getArticleList'
    },
    // 获取文章回收站列表
    getDustbinList: {
        method: 'post',
        url: 'article/getDustbinList'
    },
    // 移动到回收站
    articleDustbin: {
        method: 'post',
        url: 'article/articleDustbin'
    },
    // 恢复到草稿箱
    articleRecovery: {
        method: 'post',
        url: 'article/articleRecovery'
    },
    // 彻底删除文章
    articleDel: {
        method: 'post',
        url: 'article/articleDel'
    }
}