<template>
	<div id="register-form" class="comp-container">
		<comp-form ref="registerForm" v-bind="registerFormData" @submit-form-handler="registerSubmit"></comp-form>
	</div>
</template>

<script>
export default {
	name: 'register-add',
	props: {
		registerData: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			registerFormData: {
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
								required: true,
								message: '请输入密码',
								trigger: 'submit'
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
					name: '注册'
				},
				formAttrs: {
					labelPosition: 'top'
				}
			}
		}
	},
	methods: {
		// 注册
		registerSubmit(userFormData) {
			this.$req(this.$api.user.register, userFormData)
				.then(({ token, uid }) => {
					this.$router.push({ name: '首页' })
					window.localStorage.setItem('token', token)
					window.localStorage.setItem('uid', uid)
				})
				.finally(() => {
					this.$refs.registerForm.submitLoading = false
				})
		}
	}
}
</script>

<style lang="less">
#register-form {
	box-sizing: border-box;
	padding-left: 15px;
}
</style>