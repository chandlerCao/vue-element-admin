<template>
    <comp-complex-table
        :form-data="queryForm"
        :table-data="tableData"
        :request-method="async (args) => $req($api.message.getReplyList, args)"
    ></comp-complex-table>
</template>

<script>
export default {
    name: 'replyList',
    inheritAttrs: false,
    data() {
        return {
            // 表格查询表单
            queryForm: {
                formData: {
                    searchValue: {
                        label: '回复信息',
                        attrs: {
                            placeholder: '支持：回复id/回复内容/回复人'
                        }
                    },
                    messageInfo: {
                        label: '留言信息',
                        attrs: {
                            placeholder: '支持：留言id/留言内容/留言人'
                        },
                        defaultValue: this.$attrs.mid
                    },
                    datePicker: {
                        label: '留言回复时间段',
                        el: 'el-date-picker',
                        attrs: {
                            type: 'daterange',
                            valueFormat: 'yyyy-MM-dd'
                        }
                    }
                },
                formAttrs: {
                    size: 'mini',
                    inline: true,
                    labelWidth: '110px'
                },
                submitBtn: {
                    name: '查询回复'
                },
                resetBtn: {
                    name: '重置'
                }
            },
            // 表格数据
            tableData: {
                primaryKey: 'rid',
                // 表头
                tableColumn: [
                    {
                        prop: 'rid',
                        label: 'ID',
                        attrs: {
                            width: 220
                        }
                    },
                    {
                        prop: 'content',
                        label: '回复内容'
                    },
                    {
                        prop: 'user',
                        label: '回复人'
                    },
                    {
                        prop: 'uip',
                        label: '回复人ip'
                    },
                    {
                        prop: 'city',
                        label: '回复人城市'
                    },
                    {
                        prop: 'like_count',
                        label: '点赞数'
                    },
                    {
                        prop: 'message_content',
                        label: '留言信息'
                    },
                    {
                        prop: 'message_user',
                        label: '留言人'
                    },
                    {
                        prop: 'date',
                        label: '回复日期',
                        attrs: {
                            width: 160
                        }
                    }
                ],
                // 操作按钮
                tableHandleBtns: {
                    width: 150,
                    // 删除功能
                    delete: {
                        btn: {
                            name: '删除回复',
                            message: '确认将当前回复吗？'
                        },
                        deleteReq: async args => {
                            // 表格删除接口
                            return this.$req(
                                this.$api.message.deleteReply,
                                args
                            )
                        }
                    }
                }
            }
        }
    }
}
</script>