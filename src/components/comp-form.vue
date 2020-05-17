<template>
    <div class="comp-form">
        <!-- 表单 -->
        <el-form
            :model="formDataVal"
            ref="compForm"
            v-bind="$attrs.formAttrs"
            class="demo-ruleForm"
            :rules="rules"
            @keyup.enter.native="submitForm"
        >
            <!-- 表单元素 -->
            <el-form-item v-for="(elm, key) in formData" :key="key" :prop="key" :label="elm.label">
                <component
                    :is="`${elm.el || 'el-input'}`"
                    v-model="formDataVal[key]"
                    v-bind="Object.assign(Object.assign({}, $attrs.elAttrs), elm.attrs)"
                >
                    <!-- 如果为下拉框 -->
                    <template v-if="elm.el === 'el-select'">
                        <el-option
                            v-for="opt in elm.options"
                            :key="opt.value"
                            :label="opt.label"
                            :value="opt.value"
                        ></el-option>
                    </template>
                </component>
            </el-form-item>
            <!-- 按钮组 -->
            <el-form-item v-if="!$attrs['is-hide-submit']">
                <!-- 提交按钮 -->
                <el-button
                    :loading="queryBtnLoading"
                    v-bind="$attrs.submitBtn && $attrs.submitBtn.attrs"
                    icon="el-icon-position"
                    @click="submitForm"
                >{{$attrs.submitBtn && $attrs.submitBtn.name || '提交'}}</el-button>
                <!-- 重置按钮 -->
                <el-button type="danger" size="mini" icon="el-icon-refresh" @click="resetForm">重置</el-button>
                <!-- 自定义按钮组 -->
                <el-button
                    v-for="btnItem in $attrs['custom-form-btns']"
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
            queryBtnLoading: this.submitDisabled,
            formDataVal: {}
        }
    },
    watch: {
        submitDisabled(submitDisabled) {
            this.queryBtnLoading = submitDisabled
        }
    },
    computed: {
        // 表单验证规则
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
            for (const formItem in this.formData) {
                this.$set(
                    this.formDataVal,
                    formItem,
                    this.formData[formItem].defaultValue || ''
                )
            }
        },
        submitForm() {
            this.$refs.compForm.validate(async valid => {
                if (valid) {
                    this.queryBtnLoading = true
                    await this.$emit('submit-form-handler', this.formDataVal)
                }
            })
        },
        // 重置表单
        resetForm() {
            this.$refs.compForm.resetFields()
        }
    }
}
</script>

<style lang="less">
</style>