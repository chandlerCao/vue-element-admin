<template>
    <el-container class="comp-table">
        <el-container>
            <el-header v-if="newTableOperationBtns.length" style="height: 40px;">
                <el-button
                    v-for="item in newTableOperationBtns"
                    :key="item.name"
                    v-bind="item.attrs"
                    @click="item.handler"
                >{{item.name}}</el-button>
            </el-header>
            <el-main>
                <el-table :data="tableData" height="100%" v-loading="tableDisabled">
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
                                v-bind="btnItem.attrs"
                                @click="btnItem.handler(scope.$index, scope.row)"
                            >{{btnItem.name}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer style="height: 50px;">
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
                        :disabled="tableDisabled"
                    ></el-pagination>
                </div>
            </el-footer>
        </el-container>
        <!-- 新增表格弹窗 -->
        <el-dialog
            v-if="tableOperationBtns.add"
            :title="tableOperationBtns.add.formData.title || '新增'"
            :visible.sync="dialogFormVisible"
        >
            <comp-form
                ref="addForm"
                v-bind="tableOperationBtns.add.formData"
                @submit-form-handler="submitAddFormHandler"
            ></comp-form>
        </el-dialog>
    </el-container>
</template>

<script>
import objUtils from '@/utils/obj-utils'
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
        },
        // 遮罩
        tableDisabled: {
            type: Boolean,
            default: false
        },
        // 表格操作按钮
        tableOperationBtns: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            formDataVal: {}, // 查询表格的参数
            tableData: new Array(20).fill({
                date: '2020-04-29 17:53:00',
                name: '曹贱贱',
                age: 23,
                sex: '男'
            }), // 表格的数据
            pagination: {
                currentPage: 1,
                total: 50,
                pageSizes: [10, 20, 30, 40, 50],
                pageSize: 10
            }, // 表格的分页信息
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
                        this.dialogFormVisible = true
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
            }, // 枚举表格操作按钮
            dialogFormVisible: false
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
        // 重载表格
        async reloadTableHandle() {
            this.$emit('update:table-disabled', true)
            // console.log(this.pagination.currentPage)
            // console.log(this.pagination.pageSize)
            // console.log(this.formData)
            // this.formDataVal = formDataVal
            await this.requstMethod({
                id: '5bf57a8f85e0f13af26e579b',
                type: 1
            })
            this.$emit('update:table-disabled', false)
        },
        // 新增表单提交回调
        async submitAddFormHandler(formDataVal) {
            console.log(formDataVal)
            // 请求新增接口
            await this.tableOperationBtns.add.formData.requstMethod({
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
.comp-table {
    height: 100%;
}
.pagination-box {
    text-align: right;
    padding-top: 15px;
}
</style>