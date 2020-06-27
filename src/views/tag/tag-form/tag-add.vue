<template>
    <tag-basic-form @submit="tagAdd"></tag-basic-form>
</template>

<script>
import tagBasicForm from './tag-basic-form'
export default {
    name: 'tag-add',
    components: { tagBasicForm },
    methods: {
        // 添加标签
        tagAdd(tagData = {}) {
            this.$req(this.$api.tag.tagAdd, { ...tagData })
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