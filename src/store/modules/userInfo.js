export default {
    namespaced: true,
    state: () => ({
        userInfo: {}
    }),
    mutations: {
        assignUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
}