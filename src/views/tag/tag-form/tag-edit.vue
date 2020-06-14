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
		// 添加标签
		async tagUpdate(tagData = {}) {
			tagData.tid = this.$route.params.tid
			await this.$req(this.$api.tag.tagUpdate, { ...tagData })
			this.$children[0].$children[0].submitLoading = false
			this.$router.push({ name: '标签列表' })
		}
	}
}
</script>

<style lang="less" scoped>
</style>