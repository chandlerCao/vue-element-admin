<template>
	<user-info-form
		ref="userInfoForm"
		@submit-form-handler="editUserInfo"
		submit-btn-name="修改用户"
		:user-data="userData"
	></user-info-form>
</template>

<script>
import userInfoForm from '../register/user-info-form'
export default {
	name: 'user-edit',
	components: { userInfoForm },
	created() {
		// 获取用户信息
		this.getUserInfo()
	},
	data() {
		return { userData: {} }
	},
	methods: {
		// 获取用户信息
		async getUserInfo() {
			this.userData = await this.$req(this.$api.user.getUserInfo, {
				uid: this.$route.params.uid
			})
		},
		// 修改用户信息
		editUserInfo(userFormData) {
			userFormData.uid = this.$route.params.uid
			this.$req(this.$api.user.editUserInfo, userFormData)
				.then(() => {
					this.$router.push({ name: '用户管理' })
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