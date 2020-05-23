<template>
	<comp-complex-table
		ref="userTable"
		:form-data="queryForm"
		:table-data="tableData"
		:table-head-btns="tableHeadBtns"
		:requst-method="async (args) => $req($api.user.getUserList, args)"
	>
		<template #head-btns>
			<el-button type="primary" size="mini" icon="el-icon-house">自定义按钮</el-button>
		</template>

		<!-- <template #handle-btns="{row}">
			<el-button v-if="row" type="primary" size="mini" icon="el-icon-house" @click="aaa(row.id)">分配角色</el-button>
		</template>-->

		<template #table-name="{ row }">
			<el-tag v-if="row">{{row.name}}</el-tag>
		</template>

		<template #table-date>
			<el-rate :value="3.7" disabled show-score text-color="#ff9900"></el-rate>
		</template>

		<template #table-age="{ row }">
			<el-progress v-if="row" :percentage="row.age" :show-text="false"></el-progress>
		</template>

		<template #table-sex="{ row }">
			<el-tag v-if="row" :type="row.sex === '男' ? '' : 'danger'">{{row.sex}}</el-tag>
		</template>
	</comp-complex-table>
</template>

<script>
export default {
	name: 'user',
	data() {
		return {
			// 查询表单
			queryForm: {
				formData: {
					name: {
						label: '姓名'
					},
					idcard: {
						label: '身份证'
					},
					sex: {
						label: '年龄'
					}
				},
				elAttrs: {
					size: 'mini'
				},
				formAttrs: {
					inline: true,
					labelWidth: '60px'
				},
				submitBtn: {
					name: '查询用户',
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
				primaryKey: 'userId',
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
				tableHandleBtns: {
					// 编辑功能
					edit: {
						// btn: {
						// 	name: '修改'
						// },
						modal: {
							title: '编辑用户',
							width: '700px'
						},
						form: {
							formData: {
								name: {
									label: '姓名'
								},
								age: {
									label: '年龄'
								},
								sex: {
									label: '性别'
								},
								job: {
									label: '职业'
								},
								xl: {
									label: '学历'
								},
								sg: {
									label: '身高'
								},
								tz: {
									label: '体重'
								},
								ah: {
									label: '爱好'
								},
								sd: {
									label: '12'
								},
								sddsds: {
									label: 'fsdkfnsk'
								},
								sddsdds: {
									label: 'fsdkfnsk'
								}
							},
							formAttrs: {
								labelWidth: '60px'
							},
							formReq: async args => {
								// 表单编辑接口
								return this.$req(
									this.$api.user.getUserList,
									args
								)
							}
						},
						getRowInfoReq: async args => {
							// 新增编辑接口
							return this.$req(this.$api.user.getUserList, args)
						}
					},
					// 删除功能
					delete: {
						btn: {
							message: '确认删除当前用户吗？'
						},
						deleteReq: async args => {
							// 表格删除接口
							return this.$req(this.$api.user.getUserList, args)
						}
					}
				}
			},
			// 表格头部自定义按钮
			tableHeadBtns: {
				// 新增功能
				add: {
					btn: {
						name: '新增用户'
					},
					modal: {
						title: '新增用户',
						width: '700px'
					},
					form: {
						formData: {
							name: {
								label: '姓名'
							},
							age: {
								label: '年龄'
							},
							sex: {
								label: '性别'
							},
							job: {
								label: '职业'
							},
							xl: {
								label: '学历'
							},
							sg: {
								label: '身高'
							},
							tz: {
								label: '体重'
							},
							ah: {
								label: '爱好'
							},
							sd: {
								label: '12'
							},
							sddsds: {
								label: 'fsdkfnsk'
							},
							sddsdds: {
								label: 'fsdkfnsk'
							}
						},
						formAttrs: {
							labelWidth: '60px'
						},
						formReq: async args => {
							// 新增表格接口
							return this.$req(this.$api.user.getUserList, args)
						}
					}
				},
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
	methods: {
		aaa(id) {
			console.log(id)
		}
	}
}
</script>

<style lang="less"></style>