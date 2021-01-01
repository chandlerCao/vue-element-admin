import Vue from 'vue'
export default {
    namespaced: true,
    state: () => ({
        tagList: []
    }),
    getters: {
        // 改变tagList的字段名
        newTagList: state => state.tagList.map(tag => ({
            label: tag.tag_name,
            value: tag.tid
        })),
        queryFormTagList: state => [{ label: '全部', value: '' }].concat(state.tagList.map(tag => ({
            label: tag.tag_name,
            value: tag.tid
        })))
    },
    mutations: {
        getTagList(state, { tagList }) {
            state.tagList = tagList
        }
    },
    actions: {
        async getTagList(context) {
            const tagList = await Vue.prototype.$req(Vue.prototype.$api.tag.getAllTag)
            context.commit('getTagList', { tagList })
        }
    }
}