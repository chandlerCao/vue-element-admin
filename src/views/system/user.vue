<template>
	<comp-complex-table
		:form-data="queryForm"
		:table-data="tableData"
		:table-operation-btns="tableOperationBtns"
		:requst-method="async (args) => $req($api.user.getUserList, args)"
	></comp-complex-table>
</template>

<script>
export default {
	name: 'userList',
	data() {
		return {
			// 查询表单
			queryForm: {
				formData: {
					name: {
						label: '姓名'
						// rule: [
						//     {
						//         required: true,
						//         message: '请输入姓名',
						//         trigger: 'blur'
						//     }
						// ]
					},
					idcard: {
						label: '身份证'
					},
					age: {
						label: '年龄',
						el: 'el-select',
						options: [
							{
								value: '选项1',
								label: '黄金糕'
							},
							{
								value: '选项2',
								label: '双皮奶'
							},
							{
								value: '选项3',
								label: '蚵仔煎'
							},
							{
								value: '选项4',
								label: '龙须面'
							},
							{
								value: '选项5',
								label: '北京烤鸭'
							}
						]
					}
				},
				elAttrs: {
					size: 'mini'
				},
				formAttrs: {
					inline: true,
					labelWidth: '70px'
				},
				submitBtn: {
					name: '查询',
					attrs: {
						type: 'primary',
						size: 'mini'
					}
				}
			},
			// 表格数据
			tableData: {
				// 表头
				tableColumn: [
					{
						prop: 'date',
						label: '日期'
					},
					{
						prop: 'name',
						label: '姓名'
					},
					{
						prop: 'age',
						label: '年龄'
					},
					{
						prop: 'sex',
						label: '性别'
					}
				],
				// 操作按钮
				handleBtns: [
					{
						name: '编辑',
						attrs: {
							type: 'primary',
							size: 'mini',
							icon: 'el-icon-edit'
						},
						handler: () => {}
					},
					{
						name: '删除',
						attrs: {
							type: 'danger',
							size: 'mini',
							icon: 'el-icon-delete-solid'
						},
						handler: () => {}
					}
				]
			},
			// 表格头部自定义按钮
			tableOperationBtns: {
				// 新增功能
				add: {
					name: '新增用户',
					// attrs: { type: 'danger' },
					// handler: () => {
					//     console.log('嘿嘿')
					// },
					addForm: {
						title: '新增用户',
						formData: {
							name: {
								label: '姓名'
							},
							age: {
								label: '年龄'
							}
						},
						formAttrs: {
							labelWidth: '60px'
						},
						isHideBtn: true,
						submitBtn: {
							attrs: {
								type: 'primary'
							}
						},
						requstMethod: async args => {
							return await this.$req(
								this.$api.user.getUserList,
								args
							)
						}
					}
				},
				// 导出excel
				export: {
					// attrs: { type: 'success' }
					// name: '导出啊'
					// attrs: { type: 'warning' }
				}
			}
		}
	}
}
</script>

<style lang="less"></style>