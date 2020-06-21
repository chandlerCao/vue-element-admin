export default {
    // 获取留言列表
    getMessageList: {
        method: 'post',
        url: 'message/getMessageList'
    },
    // 删除留言
    deleteMessage: {
        method: 'post',
        url: 'message/deleteMessage'
    },
    // 回复列表
    getReplyList: {
        method: 'post',
        url: 'message/getReplyList'
    },
    // 删除回复
    deleteReply: {
        method: 'post',
        url: 'message/deleteReply'
    },
}