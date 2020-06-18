<template>
	<comp-complex-table
		style="box-sizing: border-box; padding: 10px 0 15px 15px;"
		:form-data="queryForm"
		:table-data="tableData"
		:requst-method="async (args) => $req($api.comment.getCommentList, args)"
	>
		<!-- 评论对应文章 -->
		<template #table-article_title="{ row }">
			<router-link v-if="row" tag="span" :to="{name: '编辑文章', params: {aid: row.aid}}">
				<el-link type="primary">{{row.article_title}}</el-link>
			</router-link>
		</template>
	</comp-complex-table>
</template>

<script>
export default {
	name: 'commentList',
	data() {
		return {
			// 表格查询表单
			queryForm: {
				formData: {
					searchValue: {
						label: '内容',
						attrs: {
							placeholder: '支持：id/内容/评论人'
						}
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
					name: '查询评论'
				},
				resetBtn: {
					name: '重置'
				}
			},
			// 表格数据
			tableData: {
				primaryKey: 'cid',
				// 表头
				tableColumn: [
					{
						prop: 'cid',
						label: 'ID',
						attrs: {
							width: 80
						}
					},
					{
						prop: 'content',
						label: '内容'
					},
					{
						prop: 'user',
						label: '评论人'
					},
					{
						prop: 'uip',
						label: '评论人ip'
					},
					{
						prop: 'city',
						label: '评论人城市'
					},
					{
						prop: 'date',
						label: '日期'
					},
					{
						prop: 'article_title',
						label: '对应文章'
					}
				],
				// 操作按钮
				tableHandleBtns: {
					width: 200,
					// 删除功能
					delete: {
						btn: {
							name: '删除',
							message: '确认将当前评论吗？'
						},
						deleteReq: async args => {
							// 表格删除接口
							return this.$req(
								this.$api.comment.deleteComment,
								args
							)
						}
					}
				}
			}
		}
	},
	methods: {}
}
</script>

<style lang="less"></style>