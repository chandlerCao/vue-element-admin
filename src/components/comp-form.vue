<template>
    <div class="comp-form">
        <!-- 表单 -->
        <el-form
            ref="compForm"
            :class="[$attrs.formAttrs.inline ? '' : 'comp-el-form__flex']"
            :model="formDataVal"
            :rules="rules"
            v-bind="$attrs.formAttrs"
            @keyup.enter.native="submitForm"
            @submit.native.prevent
        >
            <!-- 表单各个元素 -->
            <div class="comp-el-custom-form-items">
                <div class="comp-el-form-wrap">
                    <!-- 表单各个元素 -->
                    <template v-for="(elm, key) in formData">
                        <el-form-item
                            v-if="!elm.hide"
                            :key="key"
                            :prop="key"
                            :label="elm.label"
                        >
                            <component
                                :is="`${elm.el || 'el-input'}`"
                                clearable
                                filterable
                                v-model="formDataVal[key]"
                                v-bind="elm.attrs"
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
                                <!-- 如果为上传 -->
                                <template v-if="elm.el === 'el-upload'">
                                    <el-button type="primary"
                                        >点击上传</el-button
                                    >
                                </template>
                            </component>
                        </el-form-item>
                    </template>
                    <!-- 表单按钮容器 -->
                    <!-- 提交按钮 -->
                    <el-form-item v-if="$attrs.formAttrs.inline">
                        <el-button
                            v-if="$attrs.submitBtn"
                            :loading="submitLoading"
                            v-bind="$attrs.submitBtn && $attrs.submitBtn.attrs"
                            type="primary"
                            icon="el-icon-position"
                            @click="submitForm"
                            >{{
                                ($attrs.submitBtn && $attrs.submitBtn.name) ||
                                '提交'
                            }}</el-button
                        >
                        <!-- 自定义按钮组 -->
                        <slot
                            name="form-custom-btns"
                            :formDataVal="formDataVal"
                        ></slot>
                        <!-- 重置按钮 -->
                        <el-button
                            v-if="$attrs.resetBtn"
                            type="danger"
                            icon="el-icon-refresh"
                            v-bind="$attrs.resetBtn.attrs"
                            @click="resetForm"
                            >{{
                                ($attrs.submitBtn && $attrs.resetBtn.name) ||
                                '重置'
                            }}</el-button
                        >
                    </el-form-item>
                </div>
            </div>
            <!-- 表单按钮容器 -->
            <div v-if="!$attrs.formAttrs.inline" class="comp-el-form-btns">
                <!-- 提交按钮 -->
                <el-form-item>
                    <el-button
                        v-if="$attrs.submitBtn"
                        :loading="submitLoading"
                        v-bind="$attrs.submitBtn && $attrs.submitBtn.attrs"
                        type="primary"
                        icon="el-icon-position"
                        @click="submitForm"
                        >{{
                            ($attrs.submitBtn && $attrs.submitBtn.name) ||
                            '提交'
                        }}</el-button
                    >
                    <!-- 自定义按钮组 -->
                    <slot
                        name="form-custom-btns"
                        :formDataVal="formDataVal"
                    ></slot>
                    <!-- 重置按钮 -->
                    <el-button
                        v-if="$attrs.resetBtn"
                        type="danger"
                        icon="el-icon-refresh"
                        v-bind="$attrs.resetBtn.attrs"
                        @click="resetForm"
                        >{{
                            ($attrs.submitBtn && $attrs.resetBtn.name) || '重置'
                        }}</el-button
                    >
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'compForm',
    inheritAttrs: false,
    props: {
        // 流体布局
        flex: {
            type: Boolean,
            default: true,
        },
        // 表单数据
        formData: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            submitLoading: this.$attrs.submitDisabled || false,
            formDataVal: {},
        }
    },
    watch: {
        formData: {
            handler(formData) {
                this.initFormDataVal(formData)
            },
            deep: true,
            immediate: true,
        },
        '$attrs.submitDisabled'(submitDisabled) {
            this.submitLoading = submitDisabled
        },
    },
    computed: {
        // 表单验证规则
        rules() {
            return Object.entries(this.formData).reduce((rules, item) => {
                rules[item[0]] = item[1].rule || []
                return rules
            }, {})
        },
        // 表单自定义组件
        customFormItems() {
            if (this.$scopedSlots['custom-form-items'])
                return this.$scopedSlots['custom-form-items']()
            return []
        },
    },
    mounted() {
        if (this.$attrs['active-submission']) this.submitForm()
    },
    methods: {
        // 初始化表单数据
        initFormDataVal(formData) {
            for (const formItem in formData) {
                this.$set(
                    this.formDataVal,
                    formItem,
                    formData[formItem].defaultValue
                )
            }
        },
        // 提交表单
        submitForm() {
            if (this.submitLoading) return
            this.$refs.compForm.validate((valid) => {
                if (!valid) return
                this.submitLoading = true
                this.$emit(
                    'submit-form-handler',
                    Object.assign({}, this.formDataVal)
                )
            })
        },
        // 重置表单
        resetForm() {
            this.$refs.compForm.resetFields()
        },
    },
}
</script>

<style lang="less">
.comp-form {
    height: 100%;
}
.comp-el-form__flex {
    display: flex;
    height: 100%;
    flex-direction: column;
    .comp-el-custom-form-items {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        .comp-el-form-wrap {
            padding-right: 30px;
        }
    }
    .comp-el-form-btns {
        flex-shrink: 0;
        background-color: #fff;
        padding-top: 10px;
        border-top: 1px solid #e4e7ed;
        .el-form-item {
            margin-bottom: 0;
        }
    }
}

// .comp-el-custom-form-items {
//     display: inline-block;
// }
// .comp-el-form-btns {
//     display: inline-block;
// }
</style>