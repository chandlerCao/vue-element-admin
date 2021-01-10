<template>
    <comp-container class="comp-complex-table">
        <el-container>
            <el-header class="comp-complex__item comp-complex__queryform">
                <!-- 表格查询表单 -->
                <comp-form
                    v-if="$attrs['form-data']"
                    ref="queryForm"
                    v-bind="$attrs['form-data']"
                    :active-submission="true"
                    :submitDisabled.sync="tableDisabled"
                    @submit-form-handler="
                        (formDataVal) => {
                            this.formDataVal = formDataVal
                            this.reloadTableHandler()
                        }
                    "
                ></comp-form>
                <!-- 表格自定义按钮 -->
                <div class="table-head-btns"></div>
            </el-header>
            <!-- 表格 -->
            <el-main class="comp-complex__item comp-complex__table">
                <comp-table
                    ref="compTable"
                    v-bind="$attrs['table-data']"
                    :disabled.sync="tableDisabled"
                    :request-method="$attrs['request-method']"
                >
                    <!-- <template #handle-btns="{row}">
                        <slot name="handle-btns" :row="row"></slot>
					</template>-->
                    <template
                        v-for="(slot, slotName) in tableSltos"
                        #[slotName]="{ row }"
                    >
                        <slot :name="slotName" :row="row"></slot>
                    </template>
                </comp-table>
            </el-main>
        </el-container>
    </comp-container>
</template>

<script>
export default {
    name: 'compComplexTable',
    inheritAttrs: false,
    props: {
        // 表格头部自定义按钮
        tableHeadBtns: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            formDataVal: {},
            tableDisabled: false,
        }
    },
    computed: {
        tableSltos() {
            return Object.keys(this.$scopedSlots)
                .filter((slotItem) => slotItem.includes('table-'))
                .reduce((prev, slotName) => {
                    prev[slotName] = this.$scopedSlots[slotName]()
                    return prev
                }, {})
        },
    },
    methods: {
        // 重载表格
        async reloadTableHandler() {
            // 重载表格
            this.$refs.compTable.pagination.currentPage = 1
            this.$refs.compTable.queryFormVal = Object.assign(
                {},
                this.formDataVal
            )
            await this.$refs.compTable.reloadTableHandler()
        },
    },
}
</script>

<style lang="less" scoped>
.comp-complex__item {
    margin-right: 15px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(131, 131, 146, 0.3);
}
.comp-complex__queryform {
    height: auto !important;
    box-sizing: border-box;
    padding-top: 15px;
}
.comp-complex__table {
    padding: 15px;
}
</style>