<template>
    <comp-complex-table
        id="user-list"
        :form-data="formData"
        :table-data="tableData"
        :requst-method="async (args) => $req($api.user.getUserList, args)"
    ></comp-complex-table>
</template>

<script>
export default {
    name: 'userList',
    data() {
        return {
            formData: {
                formData: {
                    name: {
                        label: '姓名',
                        rule: [
                            { required: true, message: '123', trigger: 'blur' }
                        ]
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
                submitBtnText: '查询'
            },
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
                        type: 'primary',
                        size: 'mini',
                        icon: 'el-icon-edit',
                        handler(index, row) {
                            console.log(row)
                        }
                    },
                    {
                        name: '删除',
                        type: 'danger',
                        size: 'mini',
                        icon: 'el-icon-delete-solid',
                        handler(index, row) {
                            console.log(row)
                        }
                    }
                ]
            }
        }
    }
}
</script>

<style lang="less">
</style>