<template>
	<div class="comp-container">
		<el-container>
			<!-- 表格查询表单 -->
			<el-header style="height: auto;">
				<!-- 查询表单 -->
				<comp-form
					v-if="$attrs['form-data']"
					ref="queryForm"
					v-bind="$attrs['form-data']"
					:submit-disabled.sync="tableDisabled"
					@submit-form-handler="submitFormHandler"
				></comp-form>
				<!-- 表格自定义按钮 -->
				<el-header v-if="newTableOperationBtns.length" style="height: 40px;">
					<el-button
						v-for="item in newTableOperationBtns"
						:key="item.name"
						v-bind="item.attrs"
						@click="item.handler"
					>{{item.name}}</el-button>
				</el-header>
			</el-header>
			<!-- 表格 -->
			<el-main>
				<comp-table
					ref="compTable"
					v-bind="$attrs['table-data']"
					:table-disabled.sync="tableDisabled"
					:requst-method="$attrs['requst-method']"
				></comp-table>
			</el-main>
		</el-container>

		<!-- 表格新增弹窗 -->
		<comp-modal :visible.sync="dialogAddFormVisible">
			<comp-form
				ref="addForm"
				style="width: 800px;"
				v-bind="tableOperationBtns.add.addForm"
				@submit-form-handler="submitAddFormHandler"
			></comp-form>
		</comp-modal>
	</div>
</template>

<script>
import objUtils from '@/utils/obj-utils'
export default {
	name: 'compComplexTable',
	inheritAttrs: false,
	props: {
		// 表格头部自定义按钮
		tableOperationBtns: {
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
			enumTableOperationBtns: {
				// 新增功能
				add: {
					name: '新增',
					attrs: {
						type: 'primary',
						size: 'mini',
						icon: 'el-icon-folder-add'
					},
					handler: () => {
						this.dialogAddFormVisible = true
					}
				},
				// 导出excel
				export: {
					name: '导出',
					attrs: {
						type: 'primary',
						size: 'mini',
						icon: 'el-icon-download'
					},
					handler: () => {
						console.log('导出')
					}
				}
			},
			dialogAddFormVisible: false
		}
	},
	computed: {
		// 表格自定义按钮
		newTableOperationBtns() {
			/* 例如  { a: 1, b: 2, c: 3 } 我要拿到 {a: 1, c: 3} 传递 obj 和 ['a', 'c']  */
			const localTableOperationBtns = objUtils.childObj(
				this.enumTableOperationBtns,
				Object.keys(this.tableOperationBtns)
			)
			return Object.values(
				objUtils.assign(
					localTableOperationBtns,
					this.tableOperationBtns
				)
			)
		}
	},
	methods: {
		// 查询表单提交回调
		async submitFormHandler(formDataVal) {
			this.tableDisabled = true
			// 重载表格
			await this.$refs.compTable.reloadTableHandle(
				Object.create(formDataVal)
			)
			this.tableDisabled = false
		},
		// 新增表单提交回调
		async submitAddFormHandler(formDataVal) {
			formDataVal
			// 请求新增接口
			await this.tableOperationBtns.add.addForm.requstMethod({
				id: '5bf57a8f85e0f13af26e579b',
				type: 1
			})
			// 新增按钮loading消失
			this.$refs.addForm.queryBtnLoading = false
			// 清空表单
			this.$refs.addForm.resetForm()
			// 弹框消失
			this.dialogFormVisible = false
		}
	}
}
</script>

<style lang="less">
</style>