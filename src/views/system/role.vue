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
                    roleName: {
                        label: '角色名称'
                    }
                },
                elAttrs: {
                    size: 'mini'
                },
                formAttrs: {
                    inline: true,
                    labelWidth: '68px'
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
                handleBtns: [
                    {
                        name: '查看',
                        type: 'primary',
                        size: 'mini',
                        handler(index, row) {
                            console.log(row)
                        }
                    },
                    {
                        name: '删除',
                        type: 'danger',
                        size: 'mini',
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