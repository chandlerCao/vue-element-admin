<template>
    <div class="comp-form">
        <el-form
            :model="formDataVal"
            ref="compForm"
            v-bind="$attrs.formAttrs"
            class="demo-ruleForm"
            :rules="rules"
        >
            <el-form-item
                v-for="(value, key) in formData"
                :key="key"
                :label="value.label"
                :prop="key"
            >
                <component
                    :is="`el-${value.el || 'input'}`"
                    v-model="formDataVal[key]"
                    v-bind="$attrs.elAttrs"
                >
                    <!-- 如果为下拉框 -->
                    <el-option
                        v-for="opt in value.options"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                    ></el-option>
                </component>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item>
                <el-button
                    :loading="queryBtnLoading"
                    type="primary"
                    @click="submitForm"
                    :size="$attrs.elAttrs.size"
                >{{$attrs.submitBtnText || '提交'}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'compForm',
    props: {
        // 表单数据
        formData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            formDataVal: {},
            queryBtnLoading: false
        }
    },
    computed: {
        rules() {
            return Object.values(this.formData).reduce((prev, item) => {
                prev[item.prop] = item.rule || []
                return prev
            }, {})
        }
    },
    created() {
        // 初始化表单数据
        this.initFormDataVal()
    },
    methods: {
        // 初始化表单数据
        initFormDataVal() {
            Object.keys(this.formData).forEach(item => {
                this.$set(
                    this.formDataVal,
                    item,
                    this.formData[item].defaultValue || null
                )
            })
        },
        submitForm() {
            this.$refs.compForm.validate(valid => {
                if (valid) {
                    this.queryBtnLoading = true
                    this.$emit('submit-form', this.formDataVal)
                }
            })
        },
        resetForm() {
            // this.$refs[formName].resetFields()
        }
    }
}
</script>

<style lang="less">
</style>