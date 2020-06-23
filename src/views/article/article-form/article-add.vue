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
		async articleAdd(articleData) {
			await this.$req(this.$api.article.articleAdd, { ...articleData })
			this.$children[0].$children[0].submitLoading = false
			this.$router.push({ name: '文章列表' })
		}
	}
}
</script>