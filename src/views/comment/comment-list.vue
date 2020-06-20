<template>
    <comp-complex-table
        :form-data="queryForm"
        :table-data="tableData"
        :request-method="async (args) => $req($api.comment.getCommentList, args)"
    >
        <!-- 文章编辑按钮 -->
        <template #handle-btns="{ row }">
            <el-button v-if="row" type="primary" size="mini" icon="el-icon-chat-dot-round">对应回复</el-button>
        </template>
        <!-- 评论对应文章 -->
        <template #table-article_title="{ row }">
            <router-link v-if="row" tag="span" :to="{name: '编辑文章', params: {aid: row.aid}}">
                <el-link>{{row.article_title}}</el-link>
            </router-link>
        </template>
    </comp-complex-table>
</template>

<script>
export default {
    name: 'commentList',
    inheritAttrs: false,
    data() {
        return {
            // 表格查询表单
            queryForm: {
                formData: {
                    searchValue: {
                        label: '内容',
                        attrs: {
                            placeholder: '支持：id/内容/评论人'
                        }
                    },
                    articleInfo: {
                        label: '文章内容',
                        attrs: {
                            placeholder: '支持：文章id/文章标题'
                        },
                        defaultValue: this.$attrs.aid || ''
                    },
                    datePicker: {
                        label: '时间段',
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
                    labelWidth: '70px'
                },
                submitBtn: {
                    name: '查询评论'
                },
                resetBtn: {
                    name: '重置'
                }
            },
            // 表格数据
            tableData: {
                primaryKey: 'cid',
                // 表头
                tableColumn: [
                    {
                        prop: 'cid',
                        label: 'ID'
                    },
                    {
                        prop: 'content',
                        label: '内容'
                    },
                    {
                        prop: 'user',
                        label: '评论人'
                    },
                    {
                        prop: 'uip',
                        label: '评论人ip'
                    },
                    {
                        prop: 'city',
                        label: '评论人城市'
                    },
                    {
                        prop: 'like_count',
                        label: '点赞数'
                    },
                    {
                        prop: 'date',
                        label: '日期'
                    },
                    {
                        prop: 'article_title',
                        label: '对应文章',
                        attrs: {
                            width: 260
                        }
                    }
                ],
                // 操作按钮
                tableHandleBtns: {
                    width: 210,
                    // 删除功能
                    delete: {
                        btn: {
                            name: '删除',
                            message: '确认将当前评论吗？'
                        },
                        deleteReq: async args => {
                            // 表格删除接口
                            return this.$req(
                                this.$api.comment.deleteComment,
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

<style lang="less"></style>