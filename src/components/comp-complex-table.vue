<template>
	<div class="comp-container comp-complex-table">
		<el-container>
			<el-header style="height: auto;">
				<!-- 表格查询表单 -->
				<comp-form
					v-if="$attrs['form-data']"
					ref="queryForm"
					v-bind="$attrs['form-data']"
					:submitDisabled.sync="tableDisabled"
					@submit-form-handler="reloadTableHandler"
				></comp-form>
				<!-- 表格自定义按钮 -->
				<div class="table-head-btns">
					<el-button
						v-for="(value, key) in newTableHeadBtns"
						:key="key"
						v-bind="value.btn.attrs"
						@click="value.handler.bind(value)()"
					>{{value.btn.name}}</el-button>
					<slot name="head-btns"></slot>
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
					<template #handle-btns="{row}">
						<slot name="handle-btns" :row="row"></slot>
					</template>
					<template v-for="(slot, slotName) in tableSltos" #[slotName]="{row}">
						<slot :name="slotName" :row="row || {}"></slot>
					</template>
				</comp-table>
			</el-main>
		</el-container>
		<!-- 表格新增弹窗 -->
		<comp-modal-form
			v-if="newTableHeadBtns.add"
			:title="newTableHeadBtns.add.modal.title"
			:width="newTableHeadBtns.add.modal.width"
			:visible.sync="newTableHeadBtns.add.modal.visible"
			:form="newTableHeadBtns.add.form"
			@submit-form-handler="reloadTableHandler"
		></comp-modal-form>
	</div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
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
							icon: 'el-icon-document'
						}
					},
					handler: () => {
						var wb = XLSX.utils.table_to_book(
							document.querySelector(
								`#${this.$attrs['table-data'].primaryKey}`
							)
						)
						// 获取二进制字符串作为输出
						var wbout = XLSX.write(wb, {
							bookType: 'xlsx',
							bookSST: true,
							type: 'array'
						})
						try {
							FileSaver.saveAs(
								//Blob 对象表示一个不可变、原始数据的类文件对象。
								//Blob 表示的不一定是JavaScript原生格式的数据。
								//File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
								//返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
								new Blob([wbout], {
									type: 'application/octet-stream'
								}),
								//设置导出文件名称
								`${this.$attrs['table-data'].name}.xlsx`
							)
						} catch (e) {
							if (typeof console !== 'undefined')
								console.log(e, wbout)
						}
						return wbout
					}
				}
			},
			newTableHeadBtns: {}
		}
	},
	computed: {
		tableSltos() {
			return Object.keys(this.$scopedSlots)
				.filter(slotItem => slotItem.includes('table-'))
				.reduce((prev, slotName) => {
					prev[slotName] = this.$scopedSlots[slotName]()
					return prev
				}, {})
		}
	},
	created() {
		// 合并自定义按钮
		this.mergeTableHeadBtns()
	},
	methods: {
		// 合并自定义按钮
		mergeTableHeadBtns() {
			if (Object.keys(this.tableHeadBtns).length) {
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
		async reloadTableHandler(formDataVal = {}) {
			// 重载表格
			this.$refs.compTable.pagination.currentPage = 1
			this.$refs.compTable.queryFormVal = Object.assign({}, formDataVal)
			await this.$refs.compTable.reloadTableHandler()
		}
	}
}
</script>

<style lang="less">
</style>