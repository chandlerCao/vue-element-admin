<template>
	<div id="article-form" class="comp-container">
		<comp-form v-bind="articleFormData" @submit-form-handler="articleSubmit">
			<template #form-items>
				<el-form-item label="内容">
					<mavon-editor
						ref="mavonEditor"
						:value="mavon.markdownTxt"
						@imgAdd="articleImgUpload"
						@change="articleCntSave"
						ishljs
						:autofocus="false"
					></mavon-editor>
				</el-form-item>
			</template>
		</comp-form>
	</div>
</template>

<script>
export default {
	name: 'article-add',
	props: {
		articleData: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			articleFormData: {
				formData: {
					title: {
						label: '标题',
						rule: [
							{
								required: true,
								message: '请输入标题',
								trigger: 'submit'
							}
						]
					},
					preface: {
						label: '前言',
						rule: [
							{
								required: true,
								message: '请输入前言',
								trigger: 'submit'
							}
						],
						attrs: {
							type: 'textarea',
							rows: '3'
						}
					},
					cover: {
						label: '封面',
						el: 'comp-upload-image',
						rule: [
							{
								required: true,
								message: '请上传封面',
								trigger: 'submit'
							}
						],
						attrs: {
							uploadImgReq: async formData => {
								return this.$req(
									this.$api.article.uploadImg,
									formData
								)
							}
						}
					},
					tag_id: {
						label: '标签',
						el: 'el-select',
						rule: [
							{
								required: true,
								message: '请选择标签',
								trigger: 'submit'
							}
						],
						options: []
					},
					state: {
						label: '是否上线',
						el: 'el-switch',
						attrs: {
							activeValue: 1,
							inactiveValue: 0
						}
					}
				},
				submitBtn: {
					name: this.$attrs['submit-btn'] || '发布文章'
				},
				resetBtn: {},
				formAttrs: {
					labelPosition: 'top'
				}
			},
			mavon: {
				markdownTxt: '',
				articleCnt: ''
			}
		}
	},
	watch: {
		articleData(articleData) {
			// 初始化文章字段值
			this.setArticleDefaultVal(articleData)
		}
	},
	created() {
		// 获取标签下拉框数据
		this.getAllTag()
	},
	methods: {
		// 获取标签下拉框数据
		async getAllTag() {
			this.articleFormData.formData.tag_id.options = (
				await this.$req(this.$api.tag.getAllTag)
			).map(tag => {
				return {
					label: tag.tag_name,
					value: tag.tid
				}
			})
		},
		// 文章上传图片
		async articleImgUpload(pos, $file) {
			var formdata = new FormData()
			formdata.append('image', $file)
			const { url } = await this.$req(
				this.$api.article.uploadImg,
				formdata
			)
			this.$refs.mavonEditor.$img2Url(pos, url)
		},
		// 初始化文章表单
		setArticleDefaultVal(articleData) {
			for (const formName in this.articleFormData.formData) {
				this.$set(
					this.articleFormData.formData[formName],
					'defaultValue',
					articleData[formName]
				)
			}
			console.log(articleData)
			this.mavon.markdownTxt = articleData.markdownTxt
			this.mavon.articleCnt = articleData.content
		},
		// 文章内容保存
		articleCntSave(markdownTxt, articleCnt) {
			this.mavon.markdownTxt = markdownTxt
			this.mavon.articleCnt = articleCnt
		},
		// 发布文章
		articleSubmit(articleData) {
			if (this.mavon.markdownTxt.trim() === '') {
				this.$message({ type: 'warning', message: '请填写文章内容！' })
				return
			}
			articleData.markdownTxt = this.mavon.markdownTxt
			articleData.content = this.mavon.articleCnt
			this.$emit('submit', articleData)
		}
	}
}
</script>

<style lang="less">
#article-form {
	box-sizing: border-box;
	padding-left: 15px;
}
</style>