<template>
    <comp-container>
        <comp-complex-table
            ref="compComplexTable"
            :form-data="queryForm"
            :table-data="tableData"
            :request-method="requestMethod"
        >
            <!-- 封面 -->
            <template #table-cover="{ row }">
                <el-image
                    v-if="row"
                    style="height: 50px;"
                    :src="row.cover"
                    :preview-src-list="[row.cover]"
                    fit="cover"
                ></el-image>
            </template>
            <!-- 标签 -->
            <template #table-tag_name="{ row }">
                <router-link
                    v-if="row"
                    tag="div"
                    :to="{name: '编辑标签', params: {tid: row.tag_id}}"
                    style="display: flex; align-items: center; cursor: pointer;"
                >
                    <el-image style="width: 16px; height: 16px;" :src="row.tag.url" fit="cover"></el-image>
                    <span style="margin-left: 5px;">{{row.tag.name}}</span>
                </router-link>
            </template>
            <!-- 点赞数 -->
            <template #table-like_count="{ row }">
                <el-link v-if="row">{{row.like_count}}</el-link>
            </template>
            <!-- 评论数 -->
            <template #table-comment_count="{ row }">
                <el-link
                    v-if="row"
                    style="padding: 0 10px;"
                    @click="showCommentByAid(row.aid)"
                >{{row.comment_count}}</el-link>
            </template>
            <!-- 状态 -->
            <template #table-state="{ row }">
                <template v-if="row">
                    <el-tag v-if="row.state === 1" type="success">上线</el-tag>
                    <el-tag v-if="row.state === 0" type="info">未上线</el-tag>
                    <el-tag v-if="row.state === -1" type="danger">回收站</el-tag>
                </template>
            </template>
        </comp-complex-table>
        <el-dialog
            title="评论列表"
            :visible.sync="acdDatas.visible"
            width="90%"
            top="50px"
            append-to-body
        >
            <div style="height: 60vh;">
                <comment-list v-if="acdDatas.visible" :aid="acdDatas.curAid"></comment-list>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="acdDatas.visible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </comp-container>
</template>

<script>
import commentList from '@/views/comment/comment-list'
export default {
    name: 'articleList',
    components: { commentList },
    props: {
        requestMethod: {
            type: Function,
            required: true
        },
        queryFormData: {
            type: Object,
            default() {
                return {}
            }
        },
        tableHandleBtns: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            // 表格查询表单
            queryForm: {
                formData: Object.assign(
                    {
                        searchValue: {
                            label: '文章信息',
                            attrs: {
                                placeholder: '支持：id/标题/前言/信息'
                            }
                        },
                        tag: {
                            label: '标签',
                            el: 'el-select',
                            options: [{ label: '全部', value: '' }]
                        },
                        datePicker: {
                            label: '发布时间段',
                            el: 'el-date-picker',
                            attrs: {
                                type: 'daterange',
                                valueFormat: 'yyyy-MM-dd'
                            }
                        }
                    },
                    this.queryFormData
                ),
                formAttrs: {
                    size: 'mini',
                    inline: true,
                    labelWidth: '90px'
                },
                submitBtn: {
                    name: '查询文章'
                },
                resetBtn: {
                    name: '重置'
                }
            },
            // 表格数据
            tableData: {
                primaryKey: 'aid',
                // 表头
                tableColumn: [
                    {
                        prop: 'aid',
                        label: 'ID',
                        attrs: {
                            width: 220
                        }
                    },
                    {
                        prop: 'title',
                        label: '标题',
                        attrs: {
                            width: 260
                        }
                    },
                    {
                        prop: 'cover',
                        label: '封面图'
                    },
                    {
                        prop: 'tag_name',
                        label: '标签',
                        attrs: { width: 116 }
                    },
                    {
                        prop: 'read_count',
                        label: '阅读量'
                    },
                    {
                        prop: 'like_count',
                        label: '点赞数'
                    },
                    {
                        prop: 'comment_count',
                        label: '评论数'
                    },
                    {
                        prop: 'state',
                        label: '状态'
                    },
                    {
                        prop: 'date',
                        label: '发布日期',
                        attrs: {
                            width: 151
                        }
                    }
                ],
                // 操作按钮
                tableHandleBtns: this.tableHandleBtns || {}
            },
            // 表格头部自定义按钮
            tableHeadBtns: {
                // 导出excel
                export: {
                    // name: '导出啊'
                    // attrs: { type: 'success' }
                    // handler() {
                    // 	console.log('导出')
                    // }
                }
            },
            // 文章对应评论弹框
            acdDatas: {
                visible: false,
                curAid: ''
            }
        }
    },
    created() {
        // 获取标签下拉框数据
        this.getAllTag()
    },
    methods: {
        // 获取标签下拉框数据
        async getAllTag() {
            this.queryForm.formData.tag.options = this.queryForm.formData.tag.options.concat(
                (await this.$req(this.$api.tag.getAllTag)).map(tag => {
                    return {
                        label: tag.tag_name,
                        value: tag.tid
                    }
                })
            )
        },
        // 获取当前文章评论列表
        showCommentByAid(aid) {
            this.acdDatas.visible = true
            this.acdDatas.curAid = aid
        }
    }
}
</script>

<style lang="less"></style>