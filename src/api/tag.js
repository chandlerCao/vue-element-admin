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
    }
}