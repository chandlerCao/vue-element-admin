<template>
	<tag-basic-form @submit="articleAdd" submit-btn="更新标签"></tag-basic-form>
</template>

<script>
import tagBasicForm from './tag-basic-form'
export default {
	name: 'article-add',
	components: { tagBasicForm },
	methods: {
		// 添加标签
		async tagAdd(tagData = {}) {
			await this.$req(this.$api.tag.tagAdd, { ...tagData })
			this.$router.push({ name: '标签列表' })
		}
	}
}
</script>

<style lang="less" scoped>
</style>