<template>
    <comp-container>
        <comp-complex-table
            :form-data="queryForm"
            :table-data="tableData"
            :request-method="
                async (args) => $req($api.comment.getCommentList, args)
            "
        >
            <!-- 评论对应文章 -->
            <template #table-article_title="{ row }">
                <comp-link
                    v-if="row"
                    @click="
                        $router.push({
                            name: '编辑文章',
                            params: { aid: row.aid },
                        })
                    "
                    >{{ row.article_title }}</comp-link
                >
            </template>
        </comp-complex-table>
        <!-- 对应的回复列表，以dialog展示 -->
        <el-dialog
            title="回复列表"
            :visible.sync="crdDatas.visible"
            width="90%"
            top="50px"
            append-to-body
        >
            <div style="height: 60vh">
                <reply-list
                    v-if="crdDatas.visible"
                    :cid="crdDatas.curCid"
                ></reply-list>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="crdDatas.visible = false"
                    >关 闭</el-button
                >
            </span>
        </el-dialog>
    </comp-container>
</template>

<script>
import replyList from './reply-list'
export default {
    name: 'commentList',
    inheritAttrs: false,
    components: { replyList },
    data() {
        return {
            // 表格查询表单
            queryForm: {
                formData: {
                    searchValue: {
                        label: '评论信息',
                        attrs: {
                            placeholder: '支持：id/内容/评论人',
                        },
                    },
                    articleInfo: {
                        label: '文章信息',
                        attrs: {
                            placeholder: '支持：文章id/文章标题',
                        },
                        defaultValue: this.$attrs.aid || '',
                    },
                    datePicker: {
                        label: '评论时间段',
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
                    name: '查询评论',
                },
                resetBtn: {
                    name: '重置',
                },
            },
            // 表格数据
            tableData: {
                primaryKey: 'cid',
                // 表头
                tableColumn: [
                    {
                        prop: 'cid',
                        label: 'ID',
                        attrs: {
                            width: 220,
                        },
                    },
                    {
                        prop: 'content',
                        label: '评论内容',
                    },
                    {
                        prop: 'user',
                        label: '评论人',
                    },
                    {
                        prop: 'uip',
                        label: '评论人ip',
                    },
                    {
                        prop: 'city',
                        label: '评论人城市',
                        attrs: { width: 100 },
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
                        label: '评论日期',
                        attrs: { width: 160, sortable: true },
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
                    width: 240,
                    // 删除功能
                    delete: {
                        btn: {
                            name: '删除评论',
                            message: '确认删除当前评论吗？',
                        },
                        deleteReq: async (args) => {
                            // 表格删除接口
                            return this.$req(
                                this.$api.comment.deleteComment,
                                args
                            )
                        },
                    },
                    customBtns: [
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
                                this.crdDatas.visible = true
                                this.crdDatas.curCid = row.cid
                            },
                        },
                    ],
                },
            },
            // 评论对应回复弹框
            crdDatas: {
                visible: false,
                curCid: '',
            },
        }
    },
}
</script>

<style lang="less"></style>