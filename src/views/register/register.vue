<template>
	<div id="register-box" class="comp-container">
		<div id="register-wrapper" class="comp-container">
			<header id="register-header">
				<span id="register-back-btn">
					<el-link @click="$router.back()">
						<i class="el-icon-back"></i> 返回
					</el-link>
				</span>
				<h2>用户注册</h2>
			</header>
			<section id="register-form">
				<comp-form ref="registerForm" v-bind="registerFormData" @submit-form-handler="registerSubmit"></comp-form>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	name: 'register-form',
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
					try {
						this.$refs.registerForm.submitLoading = false
					} catch (error) {
						error
					}
				})
		}
	}
}
</script>

<style lang="less">
#register-box {
	box-sizing: border-box;
	padding: 0 15px 10px;
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