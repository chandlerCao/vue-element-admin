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
		async tagAdd(tagData = {}) {
			await this.$req(this.$api.tag.tagAdd, { ...tagData })
			this.$children[0].$children[0].submitLoading = false
			this.$router.push({ name: '标签列表' })
		}
	}
}
</script>

<style lang="less" scoped>
</style>