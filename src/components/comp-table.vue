<template>
	<div class="comp-container comp-table">
		<el-container>
			<!-- 表格 -->
			<el-main>
				<el-table :data="tableData" height="100%" v-loading="tableDisabled">
					<el-table-column
						v-for="item in tableColumn"
						:key="item.prop"
						:fixed="item.fixed"
						:prop="item.prop"
						:label="item.label"
						:width="item.width"
					>
						<template #default="{ row }">
							<slot :name="`table-${item.prop}`" :value="row[item.prop]">{{row[item.prop]}}</slot>
						</template>
					</el-table-column>
					<!-- 表格操作 -->
					<el-table-column v-if="Object.keys(tableHandleBtns).length" label="操作">
						<template #default="{$index, row}">
							<el-button
								v-if="newTableHandleBtns.edit"
								v-bind="newTableHandleBtns.edit.btn.attrs"
								@click="newTableHandleBtns.edit.handler.call(newTableHandleBtns.edit, {index: $index, primaryKey: row[primaryKey], row})"
							>{{newTableHandleBtns.edit.btn.name}}</el-button>
							<el-popconfirm
								v-if="newTableHandleBtns.delete"
								style="margin-left: 10px; margin-left: 10px;"
								title="确认删除？"
								@onConfirm="newTableHandleBtns.delete.handler.call(newTableHandleBtns.delete, {index: $index, primaryKey: row[primaryKey], row})"
							>
								<el-button
									slot="reference"
									v-bind="newTableHandleBtns.delete.btn.attrs"
								>{{newTableHandleBtns.delete.btn.name}}</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
			<!-- 分页 -->
			<el-footer style="height: 50px;">
				<div class="pagination-box">
					<el-pagination
						:total="pagination.total"
						:page-sizes="pagination.pageSizes"
						:current-page.sync="pagination.currentPage"
						:page-size.sync="pagination.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						background
						@size-change="reloadTableHandle({})"
						@current-change="reloadTableHandle({})"
						:disabled="tableDisabled"
					></el-pagination>
				</div>
			</el-footer>
		</el-container>
		<!-- 表格编辑弹窗 -->
		<comp-modal-form
			v-if="newTableHandleBtns.edit"
			:title="newTableHandleBtns.edit.modal.title"
			:width="newTableHandleBtns.edit.modal.width"
			:visible.sync="newTableHandleBtns.edit.modal.visible"
			:form="newTableHandleBtns.edit.form"
			@submit-form-handler="reloadTableHandle"
		></comp-modal-form>
	</div>
</template>

<script>
import objUtils from '@/utils/obj-utils'
export default {
	name: 'comp-table',
	props: {
		primaryKey: {
			type: String,
			required: true
		},
		tableColumn: {
			type: Array,
			default: () => []
		},
		tableHandleBtns: {
			type: Object,
			default: () => {}
		},
		// 请求方法
		requstMethod: {
			type: Function,
			default: async () => null
		},
		// 遮罩
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			formDataVal: {}, // 缓存查询表格的表单值
			// 表格的数据
			tableData: new Array(20).fill('_').map(() => ({
				id: Math.random(),
				date: '2020-04-29 17:53:00',
				name: '曹德健',
				age: 23,
				sex: '男'
			})),
			// 表格的分页信息
			pagination: {
				currentPage: 1,
				total: 50,
				pageSizes: [10, 20, 30, 40, 50],
				pageSize: 10
			},
			// 表格loading
			tableDisabled: this.disabled,
			// 枚举表格操作按钮
			enumTableHandleBtns: {
				// 编辑功能
				edit: {
					btn: {
						name: '编辑',
						attrs: {
							type: 'primary',
							size: 'mini',
							icon: 'el-icon-edit',
							loading: false
						}
					},
					modal: {
						title: '编辑',
						visible: false
					},
					async handler({ row }) {
						this.btn.attrs.loading = true
						await this.getRowInfoReq({ pageIndex: 2, pageSize: 10 })
						for (const key in this.form.formData) {
							this.form.formData[key].defaultValue = row[key]
						}
						this.modal.visible = true
						this.btn.attrs.loading = false
					}
				},
				// 删除功能
				delete: {
					btn: {
						name: '删除',
						attrs: {
							type: 'danger',
							size: 'mini',
							icon: 'el-icon-delete-solid'
						}
					},
					async handler({ primaryKey }) {
						// await this.deleteReq()
						console.log(primaryKey)
					}
				}
			},
			newTableHandleBtns: {}
		}
	},
	watch: {
		disabled(disabled) {
			this.tableDisabled = disabled
		},
		tableDisabled(tableDisabled) {
			this.$emit('update:disabled', tableDisabled)
		}
	},
	created() {
		// 合并表格操作按钮
		this.mergeTableHandleBtns()
	},
	methods: {
		// 重载表格
		async reloadTableHandle(formDataVal) {
			this.tableDisabled = true
			await this.requstMethod({
				pageIndex: this.pagination.currentPage,
				pageSize: this.pagination.pageSize,
				...formDataVal
			})
			this.tableDisabled = false
		},
		// 合并表格操作按钮
		mergeTableHandleBtns() {
			if (Object.keys(this.tableHandleBtns).length) {
				const localTableHandleBtns = {}
				for (const key in this.tableHandleBtns) {
					if (this.enumTableHandleBtns[key])
						localTableHandleBtns[key] = this.enumTableHandleBtns[
							key
						]
				}
				this.newTableHandleBtns = objUtils.assign(
					localTableHandleBtns,
					this.tableHandleBtns
				)
			}
		}
	}
}
</script>

<style lang="less">
.pagination-box {
	text-align: right;
	padding-top: 15px;
}
</style>