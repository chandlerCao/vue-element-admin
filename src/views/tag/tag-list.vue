<template>
    <comp-complex-table
        :form-data="queryForm"
        :table-data="tableData"
        :request-method="async (args) => $req($api.tag.getTagList, args)"
    >
        <!-- 标签编辑按钮 -->
        <!-- <template #handle-btns="{ row }">
            <router-link v-if="row" tag="span" :to="{name: '编辑标签', params: {tid: row.tid}}">
                <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            </router-link>
		</template>-->
        <template #table-tag_icon="{ row }">
            <el-image
                v-if="row"
                style="height: 50px"
                :src="row.tag_icon"
                :preview-src-list="[row.tag_icon]"
            ></el-image>
        </template>
    </comp-complex-table>
</template>

<script>
import tagEdit from './tag-form/tag-edit'
export default {
    name: 'tagList',
    data() {
        return {
            // 表格查询表单
            queryForm: {
                formData: {
                    searchValue: {
                        label: '标签信息',
                        attrs: {
                            placeholder: '支持：标签id/标签名称',
                        },
                    },
                },
                formAttrs: {
                    size: 'mini',
                    inline: true,
                    labelWidth: '70px',
                },
                submitBtn: {
                    name: '查询标签',
                },
                resetBtn: {
                    name: '重置',
                },
            },
            // 表格数据
            tableData: {
                primaryKey: 'tid',
                // 表头
                tableColumn: [
                    {
                        prop: 'tag_name',
                        label: '标签名称',
                    },
                    {
                        prop: 'tag_icon',
                        label: '标签图标',
                    },
                ],
                // 操作按钮
                tableHandleBtns: {
                    width: 240,
                    dialogBtns: [
                        {
                            btn: {
                                name: '编辑标签',
                            },
                            dialog: {
                                title: '编辑标签',
                                arguments: ['tid'],
                                el: tagEdit,
                            },
                        },
                    ],
                    // 删除功能
                    delete: {
                        btn: {
                            name: '删除标签',
                            message: '确认删除当前标签吗？',
                        },
                        deleteReq: async (args) => {
                            // 表格删除接口
                            return this.$req(this.$api.tag.tagDelete, args)
                        },
                    },
                    /* customBtns: [
						{
							btn: {
								name: '编辑标签',
								attrs: {
									type: 'primary',
									size: 'mini',
									icon: 'el-icon-edit'
								}
							},
							handler: row => {
								this.$router.push({
									name: '编辑标签',
									params: { tid: row.tid }
								})
							}
						}
					] */
                },
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
                },
            },
        }
    },
}
</script>

<style lang="less"></style>