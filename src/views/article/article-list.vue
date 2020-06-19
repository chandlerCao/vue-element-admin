<template>
	<comp-complex-table
		style="box-sizing: border-box; padding: 10px 0 15px 15px;"
		:form-data="queryForm"
		:table-data="tableData"
		:requst-method="async (args) => $req($api.article.getArticleList, args)"
	>
		<!-- 文章编辑按钮 -->
		<template #handle-btns="{ row }">
			<router-link v-if="row" tag="span" :to="{name: '编辑文章', params: { aid: row.aid }}">
				<el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
			</router-link>
		</template>
		<!-- 封面 -->
		<template #table-cover="{ row }">
			<el-image
				v-if="row"
				style="height: 50px;"
				:src="row.cover"
				:preview-src-list="[row.cover]"
				fit="cover"
			></el-image>
		</template>
		<!-- 标签 -->
		<template #table-tag_name="{ row }">
			<router-link
				v-if="row"
				tag="div"
				:to="{name: '编辑标签', params: {tid: row.tag_id}}"
				style="display: flex; align-items: center; cursor: pointer;"
			>
				<el-image style="width: 16px; height: 16px;" :src="row.tag.url" fit="cover"></el-image>
				<span style="margin-left: 5px;">{{row.tag.name}}</span>
			</router-link>
		</template>
		<!-- 点赞数 -->
		<template #table-like_count="{ row }">
			<el-link v-if="row">{{row.like_count}}</el-link>
		</template>
		<!-- 评论数 -->
		<template #table-comment_count="{ row }">
			<el-link v-if="row">{{row.comment_count}}</el-link>
		</template>
		<!-- 状态 -->
		<template #table-state="{ row }">
			<el-tag
				v-if="row"
				:type="row.state === 1 ? 'success' : 'info'"
			>{{row.state === 1 ? '上线' : '未上线'}}</el-tag>
		</template>
	</comp-complex-table>
</template>

<script>
export default {
	name: 'articleList',
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
					state: {
						label: '状态',
						el: 'el-select',
						options: [
							{
								label: '全部',
								value: ''
							},
							{
								label: '上线',
								value: '1'
							},
							{
								label: '未上线',
								value: '0'
							}
						]
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
					name: '查询文章'
				},
				resetBtn: {
					name: '重置'
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
						prop: 'state',
						label: '状态'
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
					width: 200,
					// 删除功能
					delete: {
						btn: {
							name: '回收站',
							message: '确认将当前文章移动到回收站吗？'
						},
						deleteReq: async args => {
							// 表格删除接口
							return this.$req(
								this.$api.article.articleDustbin,
								args
							)
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
			}
		}
	},
	created() {
		// 获取标签下拉框数据
		this.getAllTag()
	},
	methods: {
		// 获取标签下拉框数据
		async getAllTag() {
			this.queryForm.formData.tag.options = this.queryForm.formData.tag.options.concat(
				(await this.$req(this.$api.tag.getAllTag)).map(tag => {
					return {
						label: tag.tag_name,
						value: tag.tid
					}
				})
			)
		}
	}
}
</script>

<style lang="less"></style>