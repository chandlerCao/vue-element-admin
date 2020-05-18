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
                        <slot
                            slot-scope="{ row }"
                            :name="`table-${item.prop}`"
                            :value="row[item.prop]"
                        >{{row[item.prop]}}</slot>
                    </el-table-column>
                    <!-- 表格操作 -->
                    <el-table-column v-if="tableHandleBtns.length" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                v-for="btnItem in tableHandleBtns"
                                :key="btnItem.name"
                                v-bind="btnItem.attrs"
                                @click="btnItem.handler(scope.$index, scope.row)"
                            >{{btnItem.name}}</el-button>
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
        tableHandleBtns: {
            type: Array,
            default: () => []
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
            tableData: new Array(20).fill({
                date: '2020-04-29 17:53:00',
                name: '曹德健',
                age: 23,
                sex: '男'
            }),
            // 表格的分页信息
            pagination: {
                currentPage: 1,
                total: 50,
                pageSizes: [10, 20, 30, 40, 50],
                pageSize: 10
            },
            // 表格loading
            tableDisabled: this.disabled
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