<template>
	<div id="tag-form" class="comp-container">
		<comp-form v-bind="tagFormData" @submit-form-handler="tagSubmit"></comp-form>
	</div>
</template>

<script>
export default {
	name: 'tag-add',
	props: {
		tagData: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			tagFormData: {
				formData: {
					tagName: {
						label: '标签名称',
						rule: [
							{
								required: true,
								message: '请输入标签名称',
								trigger: 'submit'
							}
						]
					},
					tagIcon: {
						label: '标签图标',
						el: 'comp-upload-image',
						rule: [
							{
								required: true,
								message: '请上传标签图标',
								trigger: 'submit'
							}
						],
						attrs: {
							uploadImgReq: async formData => {
								return this.$req(
									this.$api.tag.uploadTagIcon,
									formData
								)
							}
						}
					}
				},
				submitBtn: {
					name: this.$attrs['submit-btn'] || '添加标签'
				},
				resetBtn: {},
				formAttrs: {
					labelPosition: 'top'
				}
			}
		}
	},
	watch: {
		tagData(tagData) {
			// 初始化标签字段值
			this.setArticleDefaultVal(tagData)
		}
	},
	methods: {
		// 初始化标签表单
		setTagDefaultVal(tagData) {
			for (const formName in this.tagFormData.formData) {
				this.$set(
					this.tagFormData.formData[formName],
					'defaultValue',
					tagData[formName]
				)
			}
			this.mavon.markdownTxt = tagData.markdownTxt
			this.mavon.tagCnt = tagData.content
		},
		// 发布标签
		tagSubmit(tagData) {
			this.$emit('submit', tagData)
		}
	}
}
</script>

<style lang="less">
#tag-form {
	box-sizing: border-box;
	padding-left: 15px;
}
</style>