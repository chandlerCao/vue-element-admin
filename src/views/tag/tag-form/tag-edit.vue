<template>
    <tag-basic-form
        @submit="tagUpdate"
        :tag-data="curTagInfo"
        submit-btn="更新标签"
    ></tag-basic-form>
</template>

<script>
import tagBasicForm from './tag-basic-form'
export default {
    name: 'tag-update',
    components: { tagBasicForm },
    props: {
        tid: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            curTagInfo: {},
        }
    },
    watch: {
        tid: {
            handler() {
                this.getTagByTid()
            },
            immediate: true,
        },
    },
    methods: {
        // 获取单个标签内容
        async getTagByTid() {
            this.curTagInfo = await this.$req(this.$api.tag.getTagByTid, {
                tid: this.tid,
            })
        },
        // 更新标签
        tagUpdate(tagData = {}) {
            tagData.tid = this.tid
            this.$req(this.$api.tag.tagUpdate, { ...tagData })
                .then(() => {
                    this.$router.push({ name: '标签列表' })
                })
                .finally(() => {
                    this.$children[0].$children[0].submitLoading = false
                })
        },
    },
}
</script>

<style lang="less" scoped>
</style>