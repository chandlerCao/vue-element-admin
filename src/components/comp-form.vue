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
                    <template v-if="value.el === 'select'">
                        <el-option
                            v-for="opt in value.options"
                            :key="opt.value"
                            :label="opt.label"
                            :value="opt.value"
                        ></el-option>
                    </template>
                </component>
            </el-form-item>
            <el-form-item>
                <!-- 提交按钮 -->
                <el-button
                    :loading="queryBtnLoading"
                    v-bind="$attrs.submitBtn && $attrs.submitBtn.attrs"
                    @click="submitForm"
                >{{$attrs.submitBtn && $attrs.submitBtn.name || '提交'}}</el-button>
                <!-- 自定义按钮组 -->
                <el-button
                    v-for="btnItem in $attrs.customFormBtns"
                    :key="btnItem.name"
                    v-bind="btnItem.attrs"
                    @click="btnItem.handler"
                >{{btnItem.name}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'compForm',
    inheritAttrs: false,
    props: {
        // 表单数据
        formData: {
            type: Object,
            default: () => {}
        },
        // 查询按钮loading
        submitDisabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            queryBtnLoading: false,
            formDataVal: {}
        }
    },
    watch: {
        submitDisabled(submitDisabled) {
            this.queryBtnLoading = submitDisabled
        }
    },
    computed: {
        rules() {
            return Object.entries(this.formData).reduce((rules, item) => {
                rules[item[0]] = item[1].rule || []
                return rules
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
                    this.$emit('submit-form-handler', this.formDataVal)
                }
            })
        },
        resetForm() {
            this.$refs.compForm.resetFields()
        }
    }
}
</script>

<style lang="less">
</style>