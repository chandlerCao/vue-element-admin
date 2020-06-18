<template>
	<comp-complex-table
		style="box-sizing: border-box; padding: 10px 0 15px 15px;"
		ref="articleDustbin"
		:form-data="queryForm"
		:table-data="tableData"
		:requst-method="async (args) => $req($api.article.getDustbinList, args)"
	>
		<!-- 文章编辑按钮 -->
		<template #handle-btns="{ row }">
			<el-button
				v-if="row"
				type="primary"
				size="mini"
				icon="el-icon-refresh-left"
				:loading="recoveryLoading"
				@click="articleRecovery(row.aid)"
			>恢复</el-button>
		</template>

		<template #table-tag_name="{ row }">
			<div v-if="row" style="display: flex; align-items: center;">
				<el-image style="width: 16px; height: 16px;" :src="row.tag.url" fit="cover"></el-image>
				<span style="margin-left: 5px;">{{row.tag.name}}</span>
			</div>
		</template>
		<template #table-cover="{ row }">
			<el-image
				v-if="row"
				style="height: 50px;"
				:src="row.cover"
				:preview-src-list="[row.cover]"
				fit="cover"
			></el-image>
		</template>
	</comp-complex-table>
</template>

<script>
export default {
	name: 'articleDustbin',
	data() {
		return {
			// 表格查询表单
			queryForm: {
				formData: {
					searchValue: {
						label: '内容',
						attrs: {
							placeholder: '支持：id/标题/前言/内容'
						}
					},
					tag: {
						label: '标签',
						el: 'el-select',
						options: [{ label: '全部', value: '' }]
					},
					datePicker: {
						label: '时间段',
						el: 'el-date-picker',
						attrs: {
							type: 'daterange',
							valueFormat: 'yyyy-MM-dd'
						}
					}
				},
				formAttrs: {
					size: 'mini',
					inline: true,
					labelWidth: '60px'
				},
				submitBtn: {
					name: '查询文章',
					attrs: {
						type: 'primary',
						size: 'mini',
						icon: 'el-icon-user'
					}
				},
				resetBtn: {
					name: '重置',
					attrs: {
						size: 'mini'
					}
				}
			},
			// 表格数据
			tableData: {
				primaryKey: 'aid',
				// 表头
				tableColumn: [
					{
						prop: 'aid',
						label: 'ID',
						attrs: {
							width: 80
						}
					},
					{
						prop: 'title',
						label: '标题'
					},
					{
						prop: 'preface',
						label: '前言'
					},
					{
						prop: 'cover',
						label: '封面图'
					},
					{
						prop: 'tag_name',
						label: '标签',
						attrs: { width: 116 }
					},
					{
						prop: 'read_count',
						label: '阅读量'
					},
					{
						prop: 'like_count',
						label: '点赞数'
					},
					{
						prop: 'comment_count',
						label: '评论数'
					},
					{
						prop: 'date',
						label: '发布日期',
						attrs: {
							width: 151
						}
					}
				],
				// 操作按钮
				tableHandleBtns: {
					width: 220,
					// 删除功能
					delete: {
						btn: {
							name: '彻底删除',
							message: '确认彻底删除当前文章吗？'
						},
						deleteReq: async args => {
							// 表格删除接口
							return this.$req(this.$api.article.articleDel, args)
						}
					}
				}
			},
			// 表格头部自定义按钮
			tableHeadBtns: {
				// 导出excel
				export: {
					// name: '导出啊'
					// attrs: { type: 'success' }
					// handler() {
					// 	console.log('导出')
					// }
				}
			},
			// 恢复按钮loading
			recoveryLoading: false
		}
	},
	created() {
		// 获取标签下拉框数据
		this.getTagList()
	},
	methods: {
		// 获取标签下拉框数据
		async getTagList() {
			this.queryForm.formData.tag.options = this.queryForm.formData.tag.options.concat(
				(await this.$req(this.$api.tag.getAllTag)).map(tag => {
					return {
						label: tag.tag_name,
						value: tag.tid
					}
				})
			)
		},
		// 恢复至草稿箱
		async articleRecovery(aid) {
			this.recoveryLoading = true
			await this.$req(this.$api.article.articleRecovery, { aid: [aid] })
			// 重载表格
			this.$refs.articleDustbin.reloadTableHandler()
			this.recoveryLoading = false
		}
	}
}
</script>

<style lang="less"></style>