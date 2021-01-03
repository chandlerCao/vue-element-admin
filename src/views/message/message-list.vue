<template>
    <comp-complex-table
        :form-data="queryForm"
        :table-data="tableData"
        :request-method="
            async (args) => $req($api.message.getMessageList, args)
        "
    ></comp-complex-table>
</template>

<script>
import messageReplyList from './message-reply-list'
export default {
    name: 'messageList',
    inheritAttrs: false,
    data() {
        return {
            // 表格查询表单
            queryForm: {
                formData: {
                    searchValue: {
                        label: '留言信息',
                        attrs: {
                            placeholder: '支持：留言id/留言内容/留言留言人',
                        },
                    },
                    datePicker: {
                        label: '留言时间段',
                        el: 'el-date-picker',
                        attrs: {
                            type: 'daterange',
                            valueFormat: 'yyyy-MM-dd',
                        },
                    },
                },
                formAttrs: {
                    size: 'mini',
                    inline: true,
                    labelWidth: '90px',
                },
                submitBtn: {
                    name: '查询留言',
                },
                resetBtn: {
                    name: '重置',
                },
            },
            // 表格数据
            tableData: {
                primaryKey: 'mid',
                // 表头
                tableColumn: [
                    {
                        prop: 'mid',
                        label: 'ID',
                        attrs: {
                            width: 220,
                        },
                    },
                    {
                        prop: 'content',
                        label: '留言内容',
                    },
                    {
                        prop: 'user',
                        label: '留言人',
                    },
                    {
                        prop: 'uip',
                        label: '留言人ip',
                    },
                    {
                        prop: 'city',
                        label: '留言人城市',
                    },
                    {
                        prop: 'like_count',
                        label: '点赞数',
                        attrs: { width: 90, sortable: true },
                    },
                    {
                        prop: 'reply_count',
                        label: '回复数',
                        attrs: { width: 90, sortable: true },
                    },
                    {
                        prop: 'date',
                        label: '留言日期',
                        attrs: {
                            width: 160,
                            sortable: true,
                        },
                    },
                ],
                // 操作按钮
                tableHandleBtns: {
                    width: 240,
                    dialogBtns: [
                        {
                            btn: {
                                name: '对应回复',
                                attrs: {
                                    icon: 'el-icon-chat-line-square',
                                },
                            },
                            dialog: {
                                title: '回复列表',
                                arguments: ['mid'],
                                el: messageReplyList,
                            },
                        },
                    ],
                    // 删除功能
                    delete: {
                        btn: {
                            name: '删除留言',
                            message: '确认将当前留言吗？',
                        },
                        deleteReq: async (args) => {
                            // 表格删除接口
                            return this.$req(
                                this.$api.message.deleteMessage,
                                args
                            )
                        },
                    },
                    /* customBtns: [
                        {
                            btn: {
                                name: '对应回复',
                                attrs: {
                                    type: 'primary',
                                    size: 'mini',
                                    icon: 'el-icon-chat-dot-round',
                                    loading: false,
                                },
                            },
                            handler: (row) => {
                                this.mrdDatas.visible = true
                                this.mrdDatas.curMid = row.mid
                            },
                        },
                    ], */
                },
            },
        }
    },
}
</script>

<style lang="less"></style>