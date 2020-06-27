<template>
    <tag-basic-form @submit="tagUpdate" :tag-data="curTagInfo" submit-btn="更新标签"></tag-basic-form>
</template>

<script>
import tagBasicForm from './tag-basic-form'
export default {
    name: 'tag-update',
    components: { tagBasicForm },
    data() {
        return {
            curTagInfo: {}
        }
    },
    created() {
        // 获取单个标签内容
        this.getTagByTid()
    },
    methods: {
        // 获取单个标签内容
        async getTagByTid() {
            this.curTagInfo = await this.$req(this.$api.tag.getTagByTid, {
                tid: this.$route.params.tid
            })
        },
        // 更新标签
        tagUpdate(tagData = {}) {
            tagData.tid = this.$route.params.tid
            this.$req(this.$api.tag.tagUpdate, { ...tagData })
                .then(() => {
                    this.$router.push({ name: '标签列表' })
                })
                .finally(() => {
                    this.$children[0].$children[0].submitLoading = false
                })
        }
    }
}
</script>

<style lang="less" scoped>
</style>