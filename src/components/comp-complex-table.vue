<template>
    <div class="comp-complex-table">
        <el-container class="comp-box">
            <!-- 表格查询表单 -->
            <el-header v-if="$attrs['form-data']" style="height: auto;">
                <comp-form
                    ref="queryForm"
                    v-bind="$attrs['form-data']"
                    v-bind:[isAddFormBtn]="newCustomFormBtns"
                    :submit-disabled.sync="tableDisabled"
                    @submit-form-handler="submitFormHandler"
                ></comp-form>
            </el-header>
            <!-- 表格 -->
            <el-main>
                <comp-table
                    ref="compTable"
                    v-bind="$attrs['table-data']"
                    :table-disabled.sync="tableDisabled"
                    :requst-method="$attrs['requst-method']"
                ></comp-table>
            </el-main>
        </el-container>
        <el-dialog
            v-if="addFormData"
            :title="addFormData.title || '新增'"
            :visible.sync="dialogFormVisible"
        >
            <comp-form
                ref="addForm"
                v-bind="addFormData"
                @submit-form-handler="submitAddFormHandler"
            ></comp-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'compComplexTable',
    inheritAttrs: false,
    props: {
        // 新增弹窗表单
        addFormData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            dialogFormVisible: false,
            tableDisabled: false
        }
    },
    computed: {
        isAddFormBtn() {
            return this.addFormData ? 'customFormBtns' : null
        },
        // 表单自定义按钮
        newCustomFormBtns() {
            return (this.addFormData
                ? [
                      {
                          name: '新增',
                          attrs: {
                              type: 'primary',
                              size: 'mini',
                              icon: 'el-icon-document-add'
                          },
                          handler: () => {
                              this.dialogFormVisible = true
                          }
                      }
                  ]
                : []
            ).concat(this.$attrs['form-data'].customFormBtns || [])
        }
    },
    methods: {
        async submitFormHandler(formDataVal) {
            this.tableDisabled = true
            // 重载表格
            await this.$refs.compTable.reloadTableHandle(
                Object.create(formDataVal)
            )
            this.tableDisabled = false
        },
        // 新增表单提交
        async submitAddFormHandler(formDataVal) {
            console.log(formDataVal)
            // 请求新增接口
            await this.addFormData.requstMethod({
                id: '5bf57a8f85e0f13af26e579b',
                type: 1
            })
            // 新增按钮loading消失
            this.$refs.addForm.queryBtnLoading = false
            // 清空表单
            this.$refs.addForm.resetForm()
            // 弹框消失
            this.dialogFormVisible = false
        }
    }
}
</script>

<style lang="less">
</style>