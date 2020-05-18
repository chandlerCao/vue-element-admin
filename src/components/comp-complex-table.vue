<template>
	<div class="comp-container">
		<el-container>
			<el-header style="height: auto;">
				<!-- 表格查询表单 -->
				<comp-form
					v-if="$attrs['form-data']"
					ref="queryForm"
					v-bind="$attrs['form-data']"
					:submit-disabled.sync="tableDisabled"
					@submit-form-handler="reloadTableHandle"
				></comp-form>
				<!-- 表格自定义按钮 -->
				<div v-if="Object.keys(tableHeadBtns).length">
					<el-button
						v-for="(value, key) in newTableHeadBtns"
						:key="key"
						v-bind="value.btn.attrs"
						@click="value.handler.bind(newTableHeadBtns[key])()"
					>{{value.btn.name}}</el-button>
					<slot name="customBtns"></slot>
				</div>
			</el-header>
			<!-- 表格 -->
			<el-main>
				<comp-table
					ref="compTable"
					v-bind="$attrs['table-data']"
					:disabled.sync="tableDisabled"
					:requst-method="$attrs['requst-method']"
				>
					<slot v-for="(slot, slotName) in $slots" :name="slotName" :slot="slotName"></slot>
				</comp-table>
			</el-main>
		</el-container>
		<!-- 表格新增弹窗 -->
		<comp-modal-form
			:title="newTableHeadBtns.add.modal.title"
			:width="newTableHeadBtns.add.modal.width"
			:visible.sync="newTableHeadBtns.add.modal.visible"
			:form="newTableHeadBtns.add.form"
			@submit-form-handler="reloadTableHandle"
		></comp-modal-form>
	</div>
</template>

<script>
import objUtils from '@/utils/obj-utils'
export default {
	name: 'compComplexTable',
	inheritAttrs: false,
	props: {
		// 表格头部自定义按钮
		tableHeadBtns: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			tableDisabled: false,
			// 枚举表格操作按钮
			enumTableHeadBtns: {
				// 新增功能
				add: {
					btn: {
						name: '新增',
						attrs: {
							type: 'primary',
							size: 'mini',
							icon: 'el-icon-folder-add'
						}
					},
					modal: {
						title: '新增',
						visible: false
					},
					handler() {
						// console.log(this)
						this.modal.visible = true
					}
				},
				// 导出excel
				export: {
					btn: {
						name: '导出',
						attrs: {
							type: 'primary',
							size: 'mini',
							icon: 'el-icon-download'
						}
					},
					handler: () => {
						console.log('导出')
					}
				}
			},
			newTableHeadBtns: {}
		}
	},
	created() {
		// 合并自定义按钮
		this.mergeTableHeadBtns()
	},
	methods: {
		// 合并自定义按钮
		mergeTableHeadBtns() {
			if (Object.keys(this.tableHeadBtns)) {
				const localTableHeadBtns = {}
				for (const key in this.tableHeadBtns) {
					if (this.enumTableHeadBtns[key])
						localTableHeadBtns[key] = this.enumTableHeadBtns[key]
				}
				this.newTableHeadBtns = objUtils.assign(
					localTableHeadBtns,
					this.tableHeadBtns
				)
			}
		},
		// 重载表格
		async reloadTableHandle(formDataVal = {}) {
			// 重载表格
			this.$refs.compTable.pagination.currentPage = 1
			await this.$refs.compTable.reloadTableHandle(
				Object.create(formDataVal)
			)
		}
	}
}
</script>

<style lang="less">
</style>