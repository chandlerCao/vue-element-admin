<template>
    <article-basic-form
        @submit="articleUpdate"
        :article-data="articleData"
        submit-btn="更新文章"
    ></article-basic-form>
</template>

<script>
import articleBasicForm from './article-basic-form'
export default {
    name: 'article-edit',
    components: { articleBasicForm },
    props: ['aid'],
    data() {
        return {
            articleData: {},
        }
    },
    // created() {},
    watch: {
        aid: {
            handler() {
                // 获取单个文章内容
                this.articleContentByAid()
            },
            immediate: true,
        },
    },
    methods: {
        // 获取单个文章内容
        async articleContentByAid() {
            this.articleData = await this.$req(
                this.$api.article.articleContentByAid,
                { aid: this.aid }
            )
        },
        // 更新文章
        articleUpdate(articleData) {
            this.$req(this.$api.article.articleUpdate, { ...articleData })
                .then(() => {})
                .finally(() => {
                    this.$children[0].$children[0].submitLoading = false
                })
        },
    },
}
</script>

<style lang="less" scoped>
</style>