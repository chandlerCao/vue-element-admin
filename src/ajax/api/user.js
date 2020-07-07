export default {
    login: {
        method: 'post',
        url: 'user/login'
    },
    register: {
        method: 'post',
        url: 'user/register'
    },
    editUserInfo: {
        method: 'post',
        url: 'user/editUserInfo'
    },
    uploadUserAvatar: {
        method: 'post',
        url: 'user/uploadUserAvatar'
    },
    getUserInfo: {
        method: 'get',
        url: 'user/getUserInfo'
    },
    getUserList: {
        method: 'post',
        url: 'user/getUserList'
    },
    deleteUser: {
        method: 'post',
        url: 'user/deleteUser'
    }
}