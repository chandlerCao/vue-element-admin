<template>
	<div id="register-box" class="comp-container">
		<div id="register-wrapper" class="comp-container">
			<header v-if="$attrs['show-head']" id="register-header">
				<span id="register-back-btn">
					<el-link @click="$router.back()">
						<i class="el-icon-back"></i> 返回
					</el-link>
				</span>
				<h2>用户注册</h2>
			</header>
			<section id="register-form">
				<comp-form ref="userForm" v-bind="userFormData" @submit-form-handler="submit"></comp-form>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	name: 'user-info-form',
	props: {
		userData: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		const validatePass = (rule, value, callback) => {
			if (!value) callback(new Error('请再次输入密码！'))
			else if (value !== this.$refs.userForm.formDataVal.password)
				callback(new Error('两次输入密码不一致!'))
			else callback()
		}
		return {
			userFormData: {
				formData: {
					username: {
						label: '用户名称',
						rule: [
							{
								required: true,
								message: '请输入用户名称',
								trigger: 'submit'
							}
						]
					},
					password: {
						label: '密码',
						rule: [
							{
								required: true,
								message: '请输入密码',
								trigger: 'submit'
							}
						]
					},
					password_confirm: {
						label: '确认密码',
						rule: [
							{
								validator: validatePass,
								trigger: 'blur'
							}
						]
					},
					avatar: {
						label: '用户头像',
						el: 'comp-upload-image',
						rule: [
							{
								required: true,
								message: '请上传用户头像',
								trigger: 'submit'
							}
						],
						attrs: {
							uploadImgReq: async formData => {
								return this.$req(
									this.$api.user.uploadUserAvatar,
									formData
								)
							}
						}
					}
				},
				submitBtn: {
					name: this.$attrs['submit-btn-name'] || '注册'
				},
				formAttrs: {
					labelPosition: 'top'
				}
			}
		}
	},
	watch: {
		userData(userData) {
			this.setUserDefaultVal(userData)
		}
	},
	methods: {
		// 初始化用户表单
		setUserDefaultVal(userData) {
			for (const formName in this.userFormData.formData) {
				if (formName === 'password' || formName === 'password_confirm')
					continue
				this.$set(
					this.userFormData.formData[formName],
					'defaultValue',
					userData[formName]
				)
			}
		},
		// 提交
		submit(userFormData) {
			this.$emit('submit-form-handler', userFormData)
		}
	}
}
</script>

<style lang="less">
#register-box {
	box-sizing: border-box;
}
#register-wrapper {
	display: flex;
	flex-direction: column;
}
#register-header {
	position: relative;
	flex-shrink: 0;
	line-height: 24px;
	padding-top: 10px;
	padding-bottom: 15px;
	border-bottom: 1px solid #dcdfe6;
	#register-back-btn {
		position: absolute;
		left: 0;
	}
	h2 {
		text-align: center;
		font-size: 20px;
	}
}
#register-form {
	flex: 1;
	overflow: hidden;
}
</style>