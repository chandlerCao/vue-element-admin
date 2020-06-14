<template>
	<article-basic-form @submit="articleUpdate" :article-data="articleData" submit-btn="更新文章"></article-basic-form>
</template>

<script>
import articleBasicForm from './article-basic-form'
export default {
	name: 'article-edit',
	components: { articleBasicForm },
	data() {
		return {
			articleData: {}
		}
	},
	created() {
		// 获取单个文章内容
		this.articleContentByAid()
	},
	methods: {
		// 获取单个文章内容
		async articleContentByAid() {
			this.articleData = await this.$req(
				this.$api.article.articleContentByAid,
				{ aid: this.$route.params.aid }
			)
		},
		// 更新文章
		async articleUpdate(articleData) {
			articleData.aid = this.$route.params.aid
			await this.$req(this.$api.article.articleUpdate, { ...articleData })
			this.$children[0].$children[0].submitLoading = false
			this.$router.push({ name: '文章列表' })
		}
	}
}
</script>

<style lang="less" scoped>
</style>