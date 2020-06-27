<template>
    <article-basic-form @submit="articleAdd"></article-basic-form>
</template>

<script>
import articleBasicForm from './article-basic-form'
export default {
    name: 'article-add',
    components: { articleBasicForm },
    methods: {
        // 添加文章
        articleAdd(articleData) {
            this.$req(this.$api.article.articleAdd, { ...articleData })
                .then(() => {
                    this.$router.push({ name: '文章列表' })
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