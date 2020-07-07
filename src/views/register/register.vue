<template>
	<user-info-form
		style="padding: 0 15px 10px;"
		ref="userInfoForm"
		@submit-form-handler="registerSubmit"
		:show-head="true"
	></user-info-form>
</template>

<script>
import userInfoForm from './user-info-form'
export default {
	name: 'register-form',
	components: { userInfoForm },
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
						this.$refs.userInfoForm.$refs.userForm.submitLoading = false
					} catch (error) {
						error
					}
				})
		}
	}
}
</script>