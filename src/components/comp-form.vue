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
					@file-change-handler="fileChangeHandler($event, key)"
				>
					<!-- 如果为下拉框 -->
					<template v-if="elm.el === 'el-select'">
						<el-option v-for="opt in elm.options" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
					</template>
					<!-- 如果为上传 -->
					<template v-if="elm.el === 'el-upload'">
						<el-button type="primary">点击上传</el-button>
					</template>
				</component>
			</el-form-item>
			<!-- 表单提交按钮组 -->
			<el-form-item>
				<!-- 提交按钮 -->
				<el-button
					v-if="$attrs.submitBtn"
					:loading="submitLoading"
					v-bind="$attrs.submitBtn && $attrs.submitBtn.attrs"
					type="primary"
					icon="el-icon-position"
					@click="submitForm"
				>{{$attrs.submitBtn && $attrs.submitBtn.name || '提交'}}</el-button>
				<!-- 重置按钮 -->
				<el-button
					v-if="$attrs.resetBtn"
					type="danger"
					icon="el-icon-refresh"
					v-bind="$attrs.resetBtn.attrs"
					@click="resetForm"
				>{{$attrs.submitBtn && $attrs.resetBtn.name || '重置'}}</el-button>
				<!-- 自定义按钮组 -->
				<el-button
					v-for="btnItem in $attrs.customFormBtns"
					:key="btnItem.name"
					v-bind="btnItem.attrs"
					@click="btnItem.handler(formDataVal) || function() {}"
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
		}
	},
	data() {
		return {
			submitLoading: this.$attrs.submitDisabled || false,
			formDataVal: {}
		}
	},
	watch: {
		'$attrs.submitDisabled'(submitDisabled) {
			this.submitLoading = submitDisabled
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
					this.submitLoading = true
					await this.$emit('submit-form-handler', this.formDataVal)
				}
			})
		},
		// 重置表单
		resetForm() {
			this.$refs.compForm.resetFields()
		},
		// 文件上传回调
		fileChangeHandler(fileList, key) {
			this.formDataVal[key] = fileList
			console.log(this.formDataVal)
		}
	}
}
</script>

<style lang="less">
</style>