<template>
    <el-container class="comp-box cdj">
        <!-- 表格查询表单 -->
        <el-header v-if="$attrs['form-data']" style="height: auto;">
            <comp-form
                ref="queryForm"
                v-bind="$attrs['form-data']"
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
</template>

<script>
export default {
    name: 'compComplexTable',
    inheritAttrs: false,
    data() {
        return {
            tableDisabled: false
        }
    },
    methods: {
        // 表单提交回调
        async submitFormHandler(formDataVal) {
            this.tableDisabled = true
            // 重载表格
            await this.$refs.compTable.reloadTableHandle(
                Object.create(formDataVal)
            )
            this.tableDisabled = false
        }
    }
}
</script>

<style lang="less">
</style>