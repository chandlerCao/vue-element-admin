<template>
    <comp-complex-table
        :form-data="formData"
        :table-data="tableData"
        :add-form-data="userAddFormData"
        :requst-method="async (args) => $req($api.user.getUserList, args)"
    ></comp-complex-table>
</template>

<script>
export default {
    name: 'userList',
    data() {
        return {
            // 查询表单
            formData: {
                formData: {
                    name: {
                        label: '姓名'
                        // rule: [
                        //     {
                        //         required: true,
                        //         message: '请输入活动名称',
                        //         trigger: 'blur'
                        //     }
                        // ]
                    },
                    age: {
                        label: '年龄',
                        el: 'select',
                        options: [
                            {
                                value: '选项1',
                                label: '黄金糕'
                            },
                            {
                                value: '选项2',
                                label: '双皮奶'
                            },
                            {
                                value: '选项3',
                                label: '蚵仔煎'
                            },
                            {
                                value: '选项4',
                                label: '龙须面'
                            },
                            {
                                value: '选项5',
                                label: '北京烤鸭'
                            }
                        ]
                    }
                },
                elAttrs: {
                    size: 'mini'
                },
                formAttrs: {
                    inline: true,
                    labelWidth: '60px'
                },
                submitBtn: {
                    name: '查询',
                    attrs: {
                        type: 'primary',
                        size: 'mini',
                        icon: 'el-icon-search'
                    }
                },
                customFormBtns: [
                    {
                        name: '导出excel',
                        attrs: {
                            type: 'primary',
                            size: 'mini',
                            icon: 'el-icon-document-add'
                        },
                        handler: () => {}
                    }
                ]
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
                ]
            },
            // 新增表单数据
            userAddFormData: {
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
                    return await this.$req(this.$api.user.getUserList, args)
                }
            }
        }
    }
}
</script>

<style lang="less"></style>