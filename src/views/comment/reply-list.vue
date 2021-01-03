<template>
    <comp-complex-table
        :form-data="queryForm"
        :table-data="tableData"
        :request-method="async (args) => $req($api.comment.getReplyList, args)"
    >
        <!-- 回复对应文章 -->
        <template #table-article_title="{ row }">
            <comp-link
                v-if="row"
                @click="
                    $router.push({ name: '编辑文章', params: { aid: row.aid } })
                "
                >{{ row.article_title }}</comp-link
            >
        </template>
    </comp-complex-table>
</template>

<script>
export default {
    name: 'replyList',
    inheritAttrs: false,
    props: {
        cid: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            // 表格查询表单
            queryForm: {
                formData: {
                    searchValue: {
                        label: '回复信息',
                        attrs: {
                            placeholder: '支持：回复id/回复内容/回复人',
                        },
                    },
                    commentInfo: {
                        label: '评论信息',
                        attrs: {
                            placeholder: '支持：评论id/评论内容/评论人',
                        },
                        defaultValue: this.cid,
                    },
                    articleInfo: {
                        label: '文章信息',
                        attrs: {
                            placeholder: '支持：文章id/文章标题',
                        },
                    },
                    datePicker: {
                        label: '回复时间段',
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
                    name: '查询回复',
                },
                resetBtn: {
                    name: '重置',
                },
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
                            width: 220,
                        },
                    },
                    {
                        prop: 'content',
                        label: '回复内容',
                    },
                    {
                        prop: 'user',
                        label: '回复人',
                    },
                    {
                        prop: 'uip',
                        label: '回复人ip',
                    },
                    {
                        prop: 'city',
                        label: '回复人城市',
                        attrs: { width: 100 },
                    },
                    {
                        prop: 'like_count',
                        label: '点赞数',
                    },
                    {
                        prop: 'comment_content',
                        label: '评论信息',
                    },
                    {
                        prop: 'comment_user',
                        label: '评论人',
                    },
                    {
                        prop: 'date',
                        label: '回复日期',
                        attrs: {
                            width: 160,
                            sortable: true,
                        },
                    },
                    {
                        prop: 'article_title',
                        label: '对应文章',
                        attrs: {
                            width: 200,
                            showOverflowTooltip: true,
                        },
                    },
                ],
                // 操作按钮
                tableHandleBtns: {
                    width: 150,
                    // 删除功能
                    delete: {
                        btn: {
                            name: '删除回复',
                            message: '确认将当前回复吗？',
                        },
                        deleteReq: async (args) => {
                            // 表格删除接口
                            return this.$req(
                                this.$api.comment.deleteReply,
                                args
                            )
                        },
                    },
                },
            },
        }
    },
}
</script>