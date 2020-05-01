<template>
	<div class="comp-table">
		<el-table v-if="tableHeight" :data="tableData" :max-height="tableHeight">
			<el-table-column
				v-for="item in tableColumn"
				:key="item.prop"
				:fixed="item.fixed"
				:prop="item.prop"
				:label="item.label"
				:width="item.width"
			></el-table-column>
			<el-table-column v-if="handleBtns.length" label="操作">
				<template slot-scope="scope">
					<el-button
						v-for="btnItem in handleBtns"
						:key="btnItem.name"
						v-bind="btnItem"
						@click="btnItem.handler(scope.$index, scope.row)"
					>{{btnItem.name}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-box">
			<el-pagination
				:total="pagination.total"
				:page-sizes="pagination.pageSizes"
				:current-page.sync="pagination.currentPage"
				:page-size.sync="pagination.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				background
				@size-change="reloadTableHandle"
				@current-change="reloadTableHandle"
				hide-on-single-page
			></el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'comp-table',
	props: {
		tableColumn: {
			type: Array,
			default: () => []
		},
		handleBtns: {
			type: Array,
			default: () => []
		},
		// 请求方法
		requstMethod: {
			type: Function,
			default: async () => null
		}
	},
	data() {
		return {
			formDataVal: {}, // 查询表格的参数
			tableData: new Array(10).fill({
				date: '2020-04-29 17:53:00',
				name: '曹贱贱',
				age: 23,
				sex: '男'
			}), // 表格的数据
			tableHeight: 0, // 表格的最大高度
			pagination: {
				currentPage: 1,
				total: 50,
				pageSizes: [10, 20, 30, 40, 50],
				pageSize: 10
			} // 表格的分页信息
		}
	},
	mounted() {
		this.tableHeight =
			this.$el.offsetHeight -
			this.$el.getElementsByClassName('pagination-box')[0].offsetHeight
	},
	methods: {
		handleSizeChange() {},
		handleCurrentChange() {},
		async reloadTableHandle() {
			// console.log(this.pagination.currentPage)
			// console.log(this.pagination.pageSize)
			// console.log(this.formData)
			// this.formDataVal = formDataVal
			console.log(
				await this.requstMethod({
					id: '5bf57a8f85e0f13af26e579b',
					type: 1
				})
			)
		}
	}
}
</script>

<style lang="less">
.comp-table {
	height: 100%;
}
.pagination-box {
	text-align: right;
	padding-top: 15px;
}
</style>