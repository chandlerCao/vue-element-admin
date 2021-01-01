import Vue from 'vue'
export default {
    namespaced: true,
    state: () => ({
        tagList: []
    }),
    getters: {
        // 用于新增或编辑文章的  文章标签列表
        formTagList: state => state.tagList.map(tag => ({
            label: tag.tag_name,
            value: tag.tid
        })),
        // 用于查询文章的 文章标签列表
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