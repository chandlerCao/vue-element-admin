<template>
    <article-basic-list
        id="article-list"
        :request-method="requestMethod"
        :query-form-data="queryFormData"
        :table-handle-btns="tableHandleBtns"
    ></article-basic-list>
</template>

<script>
import articleBasicList from './article-basic-list'
export default {
    name: 'article-list',
    components: { articleBasicList },
    data() {
        return {
            requestMethod: async args =>
                this.$req(this.$api.article.getArticleList, args),
            queryFormData: {
                state: {
                    label: '状态',
                    el: 'el-select',
                    options: [
                        {
                            label: '全部',
                            value: ''
                        },
                        {
                            label: '上线',
                            value: '1'
                        },
                        {
                            label: '未上线',
                            value: '0'
                        }
                    ]
                }
            },
            tableHandleBtns: {
                width: 230,
                // 删除功能
                delete: {
                    btn: {
                        name: '回收站',
                        message: '确认将当前文章移动到回收站吗？'
                    },
                    deleteReq: async args => {
                        // 表格删除接口
                        return this.$req(this.$api.article.articleDustbin, args)
                    }
                },
                customBtns: [
                    {
                        btn: {
                            name: '编辑文章',
                            attrs: {
                                type: 'primary',
                                size: 'mini',
                                icon: 'el-icon-edit'
                            }
                        },
                        handler: row => {
                            this.$router.push({
                                name: '编辑文章',
                                params: { aid: row.aid }
                            })
                        }
                    }
                ]
            }
        }
    }
}
</script>