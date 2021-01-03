<template>
    <article-basic-list
        ref="articleDustbin"
        id="article-dustbin"
        :request-method="requestMethod"
        :table-handle-btns="tableHandleBtns"
    ></article-basic-list>
</template>

<script>
import articleBasicList from './article-basic-list'
export default {
    name: 'article-dustbin',
    components: { articleBasicList },
    data() {
        return {
            requestMethod: async (args) =>
                this.$req(this.$api.article.getDustbinList, args),
            tableHandleBtns: {
                width: 220,
                // 删除功能
                delete: {
                    btn: {
                        name: '彻底删除',
                        message: '确认彻底删除当前文章吗？',
                    },
                    deleteReq: async (args) => {
                        // 表格删除接口
                        return this.$req(this.$api.article.articleDel, args)
                    },
                },
                customBtns: [
                    {
                        btn: {
                            name: '还原',
                            attrs: {
                                type: 'success',
                                size: 'mini',
                                icon: 'el-icon-refresh-left',
                                loading: false,
                            },
                        },
                        handler: async (row, handleBtn) => {
                            handleBtn.btn.attrs.loading = true
                            await this.$req(this.$api.article.articleRecovery, {
                                aid: [row.aid],
                            })
                            // 重载表格
                            this.$refs.articleDustbin.$refs.compComplexTable.reloadTableHandler()
                            handleBtn.btn.attrs.loading = false
                        },
                    },
                ],
            },
        }
    },
}
</script>