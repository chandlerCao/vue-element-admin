export default {
    getTagList: {
        method: 'post',
        url: 'tag/getTagList'
    },
    // 获取所有标签
    getAllTag: {
        method: 'get',
        url: 'tag/getAllTag'
    },
    // 上传标签图片
    uploadTagIcon: {
        method: 'post',
        url: 'tag/uploadTagIcon'
    },
    // 添加标签
    tagAdd: {
        method: 'post',
        url: 'tag/tagAdd'
    },
    // 获取单个标签详情
    getTagByTid: {
        method: 'get',
        url: 'tag/getTagByTid'
    },
    // 更新标签
    tagUpdate: {
        method: 'post',
        url: 'tag/tagUpdate'
    },
    // 删除标签
    tagDelete: {
        method: 'post',
        url: 'tag/tagDelete'
    }
}