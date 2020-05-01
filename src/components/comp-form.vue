<template>
	<div class="comp-form">
		<el-form :model="formDataVal" ref="compForm" v-bind="$attrs" class="demo-ruleForm" :rules="rules">
			<el-form-item v-for="item in formData" :key="item.prop" :label="item.label" :prop="item.prop">
				<component
					:is="`el-${item.el || 'input'}`"
					v-model="formDataVal[item.prop]"
					v-bind="item.elAttrs"
				>
					<!-- 如果为下拉框 -->
					<el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
				</component>
			</el-form-item>
			<!-- 提交按钮 -->
			<el-form-item>
				<el-button
					type="primary"
					@click="submitForm"
					:size="$attrs.size"
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
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			formDataVal: {}
		}
	},
	computed: {
		rules() {
			return this.formData.reduce((prev, item) => {
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
			this.formData.forEach(item => {
				this.$set(
					this.formDataVal,
					item.prop,
					item.defaultValue || null
				)
			})
		},
		submitForm() {
			this.$refs.compForm.validate(valid => {
				if (valid) this.$emit('submit-form', this.formDataVal)
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