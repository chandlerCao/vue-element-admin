<template>
	<div class="comp-form">
		<!-- 表单 -->
		<el-form
			ref="compForm"
			:class="[!$attrs.formAttrs.inline ? 'comp-el-form__flex' : '']"
			:model="formDataVal"
			:rules="rules"
			v-bind="$attrs.formAttrs"
			@keyup.enter.native="submitForm"
		>
			<!-- 表单元素 -->
			<div class="comp-el-form-items">
				<el-form-item v-for="(elm, key) in formData" :key="key" :prop="key" :label="elm.label">
					<component
						:is="`${elm.el || 'el-input'}`"
						clearable
						filterable
						v-model="formDataVal[key]"
						v-bind="elm.attrs"
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
				<slot name="form-items"></slot>
			</div>
			<!-- 表单提交按钮组 -->
			<div class="comp-el-form-btns">
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
					<!-- 自定义按钮组 -->
					<slot name="form-custom-btns" :formDataVal="formDataVal"></slot>
					<!-- 重置按钮 -->
					<el-button
						v-if="$attrs.resetBtn"
						type="danger"
						icon="el-icon-refresh"
						v-bind="$attrs.resetBtn.attrs"
						@click="resetForm"
					>{{$attrs.submitBtn && $attrs.resetBtn.name || '重置'}}</el-button>
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
			default: true
		},
		// 表单数据
		formData: {
			required: true,
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			submitLoading: this.$attrs.submitDisabled || false,
			formDataVal: {}
		}
	},
	watch: {
		formData: {
			handler(formData) {
				this.initFormDataVal(formData)
			},
			deep: true
		},
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
		submitForm() {
			this.$refs.compForm.validate(valid => {
				if (valid) {
					this.submitLoading = true
					this.$emit('submit-form-handler', this.formDataVal)
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
.comp-form {
	height: 100%;
}
.comp-el-form__flex {
	display: flex;
	height: 100%;
	flex-direction: column;
	.comp-el-form-items {
		flex: 1;
		overflow: auto;
	}
	.comp-el-form-btns {
		flex-shrink: 0;
		padding: 10px 0;
		background-color: #fff;
		border-top: 1px solid #e4e7ed;
	}
}

.comp-el-form-items {
	display: inline-block;
}
.comp-el-form-btns {
	display: inline-block;
}
</style>