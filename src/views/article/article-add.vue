<template>
	<div id="article-add" class="comp-container">
		<comp-form v-bind="articleFormData" @submit-form-handler="articleAdd">
			<!-- <template #form-custom-btns="{formDataVal}">
				<el-button v-if="formDataVal" type="info" icon="el-icon-tickets" @click="aaa(formDataVal)">线下发布</el-button>
			</template>-->
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
					<!-- :navigation="true" -->
				</el-form-item>
			</template>
		</comp-form>
	</div>
</template>

<script>
export default {
	name: 'article-add',
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
					name: '发布文章'
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
	created() {
		// 获取标签下拉框数据
		this.getTagList()
	},
	methods: {
		// 获取标签下拉框数据
		async getTagList() {
			this.articleFormData.formData.tag_id.options = (
				await this.$req(this.$api.tag.getTagList)
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
		// 文章内容保存
		articleCntSave(markdownTxt, articleCnt) {
			this.mavon.markdownTxt = markdownTxt
			this.mavon.articleCnt = articleCnt
		},
		// 添加文章
		async articleAdd(articleData) {
			if (this.mavon.markdownTxt.trim() === '') {
				this.$message({ type: 'warning', message: '请填写文章内容！' })
				return
			}
			articleData.markdownTxt = this.mavon.markdownTxt
			articleData.content = this.mavon.articleCnt
			await this.$req(this.$api.article.articleAdd, { ...articleData })
			this.$router.push({ name: '文章列表' })
		}
	}
}
</script>

<style lang="less" scoped>
#article-add {
	box-sizing: border-box;
	padding: 10px 0 0 15px;
}
</style>