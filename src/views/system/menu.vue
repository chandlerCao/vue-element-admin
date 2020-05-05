<template>
    <comp-complex-table
        :form-data="formData"
        :table-data="tableData"
        :requst-method="async (args) => $req($api.user.getUserList, args)"
    ></comp-complex-table>
</template>

<script>
export default {
    name: 'menuList',
    data() {
        return {
            // 查询表单
            formData: {
                formData: {
                    name: {
                        label: '菜单名称'
                        // rule: [
                        //     {
                        //         required: true,
                        //         message: '请输入姓名',
                        //         trigger: 'blur'
                        //     }
                        // ]
                    }
                },
                elAttrs: {
                    size: 'mini'
                },
                formAttrs: {
                    inline: true,
                    labelWidth: '70px'
                },
                submitBtn: {
                    name: '查询',
                    attrs: {
                        type: 'primary',
                        size: 'mini'
                    }
                }
            },
            // 表格数据
            tableData: {
                // 表头
                tableColumn: [
                    {
                        prop: 'date',
                        label: '日期'
                    },
                    {
                        prop: 'name',
                        label: '姓名'
                    },
                    {
                        prop: 'age',
                        label: '年龄'
                    },
                    {
                        prop: 'sex',
                        label: '性别'
                    }
                ],
                // 操作按钮
                handleBtns: [
                    {
                        name: '编辑',
                        attrs: {
                            type: 'primary',
                            size: 'mini',
                            icon: 'el-icon-edit'
                        },
                        handler: () => {}
                    },
                    {
                        name: '删除',
                        attrs: {
                            type: 'danger',
                            size: 'mini',
                            icon: 'el-icon-delete-solid'
                        },
                        handler: () => {}
                    }
                ],
                tableOperationBtns: {
                    // 新增功能
                    add: {
                        name: '新增菜单',
                        attrs: { type: 'danger' },
                        // handler: () => {
                        //     console.log('嘿嘿')
                        // },
                        formData: {
                            title: '新增用户',
                            formData: {
                                name: {
                                    label: '姓名'
                                },
                                age: {
                                    label: '年龄'
                                },
                                sex: {
                                    label: '性别',
                                    el: 'select',
                                    options: [
                                        {
                                            label: '男',
                                            value: '1'
                                        },
                                        {
                                            label: '女',
                                            value: '2'
                                        }
                                    ]
                                }
                            },
                            formAttrs: {
                                labelWidth: '60px'
                            },
                            submitBtn: {
                                attrs: {
                                    type: 'primary'
                                }
                            },
                            requstMethod: async args => {
                                return await this.$req(
                                    this.$api.user.getUserList,
                                    args
                                )
                            }
                        }
                    },
                    // 导出excel
                    export: {
                        name: '导出菜单',
                        attrs: { type: 'success' }
                        // name: '导出啊',
                        // attrs: { type: 'warning' }
                    }
                }
            }
        }
    }
}
</script>

<style lang="less"></style>