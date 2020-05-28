<template>
	<div class="comp-container comp-table">
		<el-container>
			<!-- 表格 -->
			<el-main>
				<el-table :id="primaryKey" :data="tableData" height="100%" v-loading="tableDisabled" stripe>
					<!-- 表格每一列 -->
					<el-table-column
						v-for="item in tableColumn"
						:key="item.prop"
						:prop="item.prop"
						:label="item.label"
						v-bind="item.attrs"
					>
						<template #default="{ row }">
							<slot :name="`table-${item.prop}`" :row="row">{{row[item.prop]}}</slot>
						</template>
					</el-table-column>
					<!-- 表格操作列 -->
					<el-table-column
						v-if="Object.keys(tableHandleBtns).length"
						label="操作"
						:width="newTableHandleBtns.width"
					>
						<template #default="{$index, row}">
							<el-button
								v-if="newTableHandleBtns.edit"
								v-bind="newTableHandleBtns.edit.btn.attrs"
								@click="newTableHandleBtns.edit.handler({self: newTableHandleBtns.edit, row})"
							>{{newTableHandleBtns.edit.btn.name}}</el-button>
							<el-popconfirm
								v-if="newTableHandleBtns.delete"
								style="margin-left: 10px; margin-right: 10px;"
								:title="newTableHandleBtns.delete.btn.message || '确认删除？'"
								@onConfirm="newTableHandleBtns.delete.handler({self: newTableHandleBtns.delete, row})"
							>
								<el-button
									slot="reference"
									v-bind="newTableHandleBtns.delete.btn.attrs"
								>{{newTableHandleBtns.delete.btn.name}}</el-button>
							</el-popconfirm>
							<slot name="handle-btns" :row="row"></slot>
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
						@size-change="reloadTableHandler"
						@current-change="reloadTableHandler"
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
			@submit-form-handler="reloadTableHandler"
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
			default() {
				return []
			}
		},
		tableHandleBtns: {
			type: Object,
			default() {
				return {}
			}
		},
		// 请求方法
		requstMethod: {
			type: Function,
			default() {
				return async () => null
			}
		}
	},
	data() {
		return {
			queryFormVal: {}, // 缓存查询表格的表单值
			// 表格的数据
			tableData: new Array(10).fill('_').map(() => ({
				id: Math.random(),
				date: '1997-05-15 03:35:00',
				name: '曹德健',
				age: 23,
				sex: Math.random() > 0.5 ? '男' : '女'
			})),
			// 表格的分页信息
			pagination: {
				currentPage: 1,
				total: 100,
				pageSizes: [10, 20, 30, 40, 50],
				pageSize: 10
			},
			// 表格loading
			tableDisabled: this.$attrs.disabled || false,
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
					async handler({ self, row }) {
						self.btn.attrs.loading = true
						await self.getRowInfoReq({ pageIndex: 2, pageSize: 10 })
						self.modal.visible = true
						for (const formKey in self.form.formData) {
							self.form.formData[formKey].defaultValue =
								row[formKey]
						}
						self.btn.attrs.loading = false
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
					handler: async ({ self, row }) => {
						self, row
						// console.log(this.primaryKey)
						// await self.deleteReq()
					}
				}
			},
			// 表格操作按钮
			newTableHandleBtns: {}
		}
	},
	watch: {
		'$attrs.disabled'(disabled) {
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
		async reloadTableHandler() {
			this.tableDisabled = true
			await this.requstMethod({
				pageIndex: this.pagination.currentPage,
				pageSize: this.pagination.pageSize,
				...this.queryFormVal
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