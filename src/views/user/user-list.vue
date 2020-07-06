<template>
	<comp-container>
		<comp-complex-table
			ref="compComplexTable"
			:form-data="queryForm"
			:table-data="tableData"
			:request-method="async (args) => $req($api.user.getUserList, args)"
		>
			<!-- 头像 -->
			<template #table-avatar="{ row }">
				<el-image
					v-if="row"
					style="height: 50px;"
					:src="row.avatar"
					:preview-src-list="[row.avatar]"
					fit="cover"
				></el-image>
			</template>
		</comp-complex-table>
	</comp-container>
</template>

<script>
export default {
	name: 'userList',
	data() {
		return {
			// 表格查询表单
			queryForm: {
				formData: {
					searchValue: {
						label: '用户信息',
						attrs: {
							placeholder: '支持：用户ID/用户名'
						}
					}
				},
				formAttrs: {
					size: 'mini',
					inline: true,
					labelWidth: '90px'
				},
				submitBtn: {
					name: '查询用户'
				},
				resetBtn: {
					name: '重置'
				}
			},
			// 表格
			tableData: {
				primaryKey: 'uid',
				// 表头
				tableColumn: [
					{
						prop: 'uid',
						label: 'ID',
						attrs: {
							width: 220
						}
					},
					{
						prop: 'username',
						label: '用户名'
					},
					{
						prop: 'avatar',
						label: '头像'
					}
				],
				// 操作按钮
				tableHandleBtns: {
					width: 240,
					// 删除功能
					delete: {
						btn: {
							name: '删除用户',
							message: '确认删除当前用户吗？'
						},
						deleteReq: async args => {
							// 表格删除接口
							return this.$req(this.$api.user.deleteUser, args)
						}
					},
					customBtns: [
						{
							btn: {
								name: '编辑用户',
								attrs: {
									type: 'primary',
									size: 'mini',
									icon: 'el-icon-edit'
								}
							},
							handler: row => {
								row
								// this.$router.push({
								// 	name: '编辑文章',
								// 	params: { aid: row.aid }
								// })
							}
						}
					]
				}
			}
		}
	}
}
</script>