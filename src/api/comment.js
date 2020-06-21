export default {
    // 获取评论列表
    getCommentList: {
        method: 'post',
        url: 'comment/getCommentList'
    },
    // 删除评论
    deleteComment: {
        method: 'post',
        url: 'comment/deleteComment'
    },
    // 回复列表
    getReplyList: {
        method: 'post',
        url: 'comment/getReplyList'
    },
    // 删除回复
    deleteReply: {
        method: 'post',
        url: 'comment/deleteReply'
    },
}