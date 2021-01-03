<template>
    <el-container>
        <!-- 表格 -->
        <el-main>
            <el-table
                :id="primaryKey"
                :data="tableData"
                height="100%"
                v-loading="tableDisabled"
                stripe
            >
                <!-- 表格序号 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 表格每一列 -->
                <el-table-column
                    v-for="item in tableColumn"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    v-bind="item.attrs"
                >
                    <template #default="{ row }">
                        <slot :name="`table-${item.prop}`" :row="row">{{
                            row[item.prop]
                        }}</slot>
                    </template>
                </el-table-column>
                <!-- 表格操作列 -->
                <el-table-column
                    v-if="Object.keys(tableHandleBtns).length"
                    label="操作"
                    :width="newTableHandleBtns.width"
                    fixed="right"
                >
                    <template #default="{ row }">
                        <!-- 自定义按钮 -->
                        <el-button
                            v-for="(
                                btnItem, index
                            ) in tableHandleBtns.customBtns"
                            :key="index"
                            v-bind="btnItem.btn.attrs"
                            @click="btnItem.handler(row, btnItem)"
                            >{{ btnItem.btn.name }}</el-button
                        >
                        <!-- 弹框按钮 -->
                        <el-button
                            v-for="(
                                btnItem, index
                            ) in newTableHandleBtns.dialogBtns"
                            :key="index"
                            v-bind="btnItem.btn.attrs"
                            @click="
                                dialogVisible = true
                                dialogIndex = index
                                btnItem.handler && btnItem.handler(row, btnItem)
                            "
                            >{{ btnItem.btn.name }}</el-button
                        >
                        <!-- 单行删除按钮 -->
                        <el-popconfirm
                            v-if="newTableHandleBtns.delete"
                            :title="
                                newTableHandleBtns.delete.btn.message ||
                                '确认删除？'
                            "
                            @onConfirm="
                                newTableHandleBtns.delete.handler({
                                    self: newTableHandleBtns.delete,
                                    row,
                                })
                            "
                        >
                            <el-button
                                slot="reference"
                                v-bind="newTableHandleBtns.delete.btn.attrs"
                                >{{
                                    newTableHandleBtns.delete.btn.name
                                }}</el-button
                            >
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <!-- 分页 -->
        <el-footer style="height: 50px">
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
        <!-- 表格单行点击出现的弹框 -->
        <el-dialog
            v-if="
                newTableHandleBtns.dialogBtns &&
                newTableHandleBtns.dialogBtns.length
            "
            :title="newTableHandleBtns.dialogBtns[dialogIndex].dialog.title"
            :visible.sync="dialogVisible"
            width="90%"
            top="50px"
            append-to-body
        >
            <div style="height: 60vh">
                <component
                    v-if="dialogVisible"
                    :is="newTableHandleBtns.dialogBtns[dialogIndex].dialog.el"
                    v-bind="
                        newTableHandleBtns.dialogBtns[dialogIndex].dialog.bind
                    "
                ></component>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false"
                    >关 闭</el-button
                >
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import objUtils from '@/utils/obj-utils'
export default {
    name: 'comp-table',
    props: {
        primaryKey: {
            type: String,
            required: true,
        },
        tableColumn: {
            type: Array,
            default() {
                return []
            },
        },
        tableHandleBtns: {
            type: Object,
            default() {
                return {}
            },
        },
        // 请求方法
        requestMethod: {
            type: Function,
            default() {
                return async () => null
            },
        },
    },
    data() {
        return {
            queryFormVal: {}, // 缓存查询表格的表单值
            // 表格的数据
            tableData: [],
            // 表格的分页信息
            pagination: {
                currentPage: 1,
                total: 0,
                pageSizes: [10, 20, 30, 40, 50],
                pageSize: 10,
            },
            // 表格loading
            tableDisabled: this.$attrs.disabled || false,
            // 弹框的索引值
            dialogIndex: 0,
            // 弹框状态
            dialogVisible: false,
            // 枚举表格操作按钮
            enumTableHandleBtns: {
                // 编辑功能
                dialogBtns: [
                    {
                        btn: {
                            name: '点击出现弹框',
                            attrs: {
                                type: 'primary',
                                size: 'mini',
                                icon: 'el-icon-edit',
                            },
                        },
                        dialog: {
                            title: '弹框来咯',
                            arguments: [],
                            bind: {},
                            el: 'div',
                        },
                        handler(row, self) {
                            self.dialog.arguments.forEach((item) => {
                                self.dialog.bind[item] = row[item]
                            })
                        },
                    },
                ],
                // 删除功能
                delete: {
                    btn: {
                        name: '删除',
                        attrs: {
                            type: 'danger',
                            size: 'mini',
                            icon: 'el-icon-delete-solid',
                            loading: false,
                        },
                    },
                    handler: async ({ self, row }) => {
                        self.btn.attrs.loading = true
                        await self.deleteReq({
                            [this.primaryKey]: [row[this.primaryKey]],
                        })
                        this.reloadTableHandler()
                        self.btn.attrs.loading = false
                    },
                },
            },
            // 表格操作按钮
            newTableHandleBtns: {},
        }
    },
    watch: {
        '$attrs.disabled'(disabled) {
            this.tableDisabled = disabled
        },
        tableDisabled(tableDisabled) {
            this.$emit('update:disabled', tableDisabled)
        },
    },
    created() {
        // 合并表格操作按钮
        this.mergeTableHandleBtns()
    },
    methods: {
        // 重载表格
        async reloadTableHandler() {
            this.tableDisabled = true

            this.requestMethod({
                pagination: {
                    currentPage: this.pagination.currentPage,
                    pageSize: this.pagination.pageSize,
                },
                params: this.queryFormVal,
            })
                .then(({ pagination, tableData }) => {
                    this.pagination.currentPage = pagination.currentPage
                    this.pagination.total = pagination.total
                    this.pagination.pageSize = pagination.pageSize
                    this.tableData = tableData
                })
                .finally(() => {
                    this.tableDisabled = false
                })
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
        },
    },
}
</script>

<style lang="less">
.pagination-box {
    text-align: right;
    padding-top: 15px;
}
</style>